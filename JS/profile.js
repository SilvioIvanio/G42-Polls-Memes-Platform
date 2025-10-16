import { getUserProfile, updateProfile } from './api.js';

console.log('profile.js loaded!');

// Loads the users profile data
async function loadProfile() {
    try {
        const profile = await getUserProfile();
        if (profile.error) {
            document.getElementById('msg').innerText = profile.error;
            return;
        }
        
        document.getElementById('displayUsername').innerText = profile.username || 'N/A';
        document.getElementById('displayEmail').innerText = profile.email || 'N/A';
        document.getElementById('displayCreatedAt').innerText = profile.created_at 
            ? new Date(profile.created_at).toLocaleDateString() 
            : 'N/A';
        
        // Hear we have a pre-fill edit form
        document.getElementById('editUsername').value = profile.username || '';
        document.getElementById('editEmail').value = profile.email || '';
    } catch (err) {
        console.error('Failed to load profile:', err);
        document.getElementById('msg').innerText = 'Failed to load profile';
    }
}

// This is where we toggle between view and edit mode
const profileView = document.getElementById('profileView');
const profileEditForm = document.getElementById('profileEditForm');
const editBtn = document.getElementById('editProfileBtn');
const cancelBtn = document.getElementById('cancelEditBtn');

if (editBtn) {
    editBtn.addEventListener('click', () => {
        profileView.style.display = 'none';
        profileEditForm.style.display = 'block';
    });
}

if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
        profileView.style.display = 'block';
        profileEditForm.style.display = 'none';
        // Clears the password fields
        document.getElementById('editPassword').value = '';
        document.getElementById('editConfirmPassword').value = '';
    });
}

// Handles the profile update
if (profileEditForm) {
    profileEditForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const msg = document.getElementById('msg');
        
        const username = document.getElementById('editUsername').value.trim();
        const email = document.getElementById('editEmail').value.trim();
        const newPassword = document.getElementById('editPassword').value;
        const confirmPassword = document.getElementById('editConfirmPassword').value;
        
        // Validates the passwords match if it was provided
        if (newPassword || confirmPassword) {
            if (newPassword !== confirmPassword) {
                msg.innerText = 'Passwords do not match';
                return;
            }
        }
        
        const data = { username, email };
        if (newPassword) {
            data.password = newPassword;
        }
        
        const result = await updateProfile(data);
        
        if (result.success) {
            msg.innerText = 'Profile updated successfully!';
            msg.style.color = 'var(--color-success)';
            
            // Reloads the profile data
            await loadProfile();
            
            // Switches back to view mode
            profileView.style.display = 'block';
            profileEditForm.style.display = 'none';
            
            // Clears the password fields
            document.getElementById('editPassword').value = '';
            document.getElementById('editConfirmPassword').value = '';
        } else {
            msg.innerText = result.error || 'Failed to update profile';
            msg.style.color = 'var(--color-danger)';
        }
    });
}

// Includes Theme toggle functionality
const lightModeBtn = document.getElementById('lightModeBtn');
const darkModeBtn = document.getElementById('darkModeBtn');
const html = document.documentElement;

// Loads the saved theme preference
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
}

function setTheme(theme) {
    if (theme === 'dark') {
        html.setAttribute('data-theme', 'dark');
        lightModeBtn.classList.remove('active');
        darkModeBtn.classList.add('active');
    } else {
        html.setAttribute('data-theme', 'light');
        darkModeBtn.classList.remove('active');
        lightModeBtn.classList.add('active');
    }
    localStorage.setItem('theme', theme);
}

if (lightModeBtn) {
    lightModeBtn.addEventListener('click', () => setTheme('light'));
}

if (darkModeBtn) {
    darkModeBtn.addEventListener('click', () => setTheme('dark'));
}

// Initializers
loadProfile();
loadTheme();
