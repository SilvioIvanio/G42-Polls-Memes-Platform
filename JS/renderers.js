import { escapeHtml } from './utils.js';
import { vote, unvote, deletePoll, deleteMeme } from './api.js';

// --- Helper for attaching delete listeners ---
function attachDeleteListeners(container, user) {
    // Delete Poll buttons
    container.querySelectorAll('.delete-poll-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.stopPropagation(); // Prevent other listeners from firing
            const pollId = btn.dataset.pollId;
            if (confirm('Are you sure you want to delete this poll?')) {
                const result = await deletePoll(pollId);
                if (result.success) {
                    btn.closest('.poll').remove(); // Remove the poll element from the DOM
                } else {
                    alert(result.error || 'Failed to delete poll.');
                }
            }
        });
    });

    // Delete Meme buttons
    container.querySelectorAll('.delete-meme-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.stopPropagation();
            const memeId = btn.dataset.memeId;
            if (confirm('Are you sure you want to delete this meme?')) {
                const result = await deleteMeme(memeId);
                if (result.success) {
                    btn.closest('.meme').remove(); // Remove the meme element from the DOM
                } else {
                    alert(result.error || 'Failed to delete meme.');
                }
            }
        });
    });
}


// Render a single poll (for featured/preview sections that should stay isolated)
export function renderSinglePoll(poll, container, keepIsolated = false, user = null) {
  container.innerHTML = '';
  const div = document.createElement('div');
  div.className = 'poll';

  const deleteButtonHtml = (user && user.id === poll.user_id)
    ? `<button class="delete-poll-btn content-delete-btn" data-poll-id="${poll.id}">Delete</button>`
    : '';

  div.innerHTML = `
    <strong>${escapeHtml(poll.question)}</strong>
    <div class="poll-meta">by ${escapeHtml(poll.author)} - ${poll.total_votes} votes</div>
    ${deleteButtonHtml}
  `;
  
  const optionsContainer = document.createElement('div');
  optionsContainer.className = 'poll-options';
  
  for (const o of poll.options) {
    const optionDiv = document.createElement('div');
    optionDiv.className = 'poll-option';
    
    optionDiv.innerHTML = `
      <label class="option-label ${o.user_voted ? 'voted' : ''}">
        <input type="checkbox" ${o.user_voted ? 'checked' : ''} disabled>
        <span>${escapeHtml(o.option_text)} (${o.votes})</span>
      </label>
      <button class="toggle-vote-btn ${o.user_voted ? 'voted' : ''}" 
              data-poll-id="${poll.id}" 
              data-option-id="${o.id}"
              data-voted="${o.user_voted}">
        ${o.user_voted ? '✓ Voted' : 'Vote'}
      </button>
    `;
    
    optionsContainer.appendChild(optionDiv);
  }
  
  div.appendChild(optionsContainer);
  container.appendChild(div);
  
  attachDeleteListeners(container, user); // Attach listeners for delete buttons

  // Attach event listeners that only refresh THIS poll
  if (keepIsolated) {
    container.querySelectorAll('.toggle-vote-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const pollId = btn.dataset.pollId;
        const optionId = btn.dataset.optionId;
        const hasVoted = btn.dataset.voted === 'true';
        
        const j = hasVoted 
          ? await unvote(pollId, optionId)
          : await vote(pollId, optionId);
        
        if (j.success) {
          // Fetch only this specific poll's updated data
          const allPolls = await fetch('/API/fetch_polls.php').then(r => r.json());
          const updatedPoll = allPolls.find(p => p.id == pollId);
          if (updatedPoll) {
            renderSinglePoll(updatedPoll, container, true, user);
          }
        } else {
          alert(j.error || (hasVoted ? 'Failed to remove vote' : 'Vote failed'));
        }
      });
    });
  }
}

export function renderPolls(polls, container, user = null) {
  container.innerHTML = '';
  for (const p of polls) {
    const div = document.createElement('div');
    div.className = 'poll';

    const deleteButtonHtml = (user && user.id === p.user_id)
        ? `<button class="delete-poll-btn content-delete-btn" data-poll-id="${p.id}">Delete</button>`
        : '';

    div.innerHTML = `
      <strong>${escapeHtml(p.question)}</strong>
      <div class="poll-meta">by ${escapeHtml(p.author)} - ${p.total_votes} votes</div>
      ${deleteButtonHtml}
    `;
    
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'poll-options';
    
    for (const o of p.options) {
      const optionDiv = document.createElement('div');
      optionDiv.className = 'poll-option';
      
      // Single toggle button that works for both vote and unvote
      optionDiv.innerHTML = `
        <label class="option-label ${o.user_voted ? 'voted' : ''}">
          <input type="checkbox" ${o.user_voted ? 'checked' : ''} disabled>
          <span>${escapeHtml(o.option_text)} (${o.votes})</span>
        </label>
        <button class="toggle-vote-btn ${o.user_voted ? 'voted' : ''}" 
                data-poll-id="${p.id}" 
                data-option-id="${o.id}"
                data-voted="${o.user_voted}">
          ${o.user_voted ? '✓ Voted' : 'Vote'}
        </button>
      `;
      
      optionsContainer.appendChild(optionDiv);
    }
    
    div.appendChild(optionsContainer);
    container.appendChild(div);
  }
  
  attachDeleteListeners(container, user); // Attach listeners for delete buttons

  // Attach event listeners for toggle vote buttons (refreshes all polls in container)
  container.querySelectorAll('.toggle-vote-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const pollId = btn.dataset.pollId;
      const optionId = btn.dataset.optionId;
      const hasVoted = btn.dataset.voted === 'true';
      
      // Toggle: unvote if already voted, vote if not
      const j = hasVoted 
        ? await unvote(pollId, optionId)
        : await vote(pollId, optionId);
      
      if (j.success) {
        const newPolls = await fetch('/API/fetch_polls.php').then(r => r.json());
        renderPolls(newPolls, container, user);
      } else {
        alert(j.error || (hasVoted ? 'Failed to remove vote' : 'Vote failed'));
      }
    });
  });
}

export function renderMemes(memes, container, user = null) {
  container.innerHTML = '';
  for (const m of memes) {
    const div = document.createElement('div');
    div.className = 'meme';

    const deleteButtonHtml = (user && user.id === m.user_id)
        ? `<button class="delete-meme-btn content-delete-btn" data-meme-id="${m.id}">Delete</button>`
        : '';

    div.innerHTML = `<div class="meme-image-container"><img src="/uploads/${encodeURIComponent(m.filename)}" alt="${escapeHtml(m.caption || '')}"></div><div class="meme-info"><span>${escapeHtml(m.caption || '')} — ${escapeHtml(m.username)}</span>${deleteButtonHtml}</div>`;
    container.appendChild(div);
  }
  attachDeleteListeners(container, user); // Attach listeners for delete buttons
}