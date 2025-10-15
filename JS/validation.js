export function validatePoll(question, options) {
  if (!question || !question.trim()) return { valid: false, error: 'Question is required' };
  if (!Array.isArray(options) || options.length < 2) return { valid: false, error: 'At least two options required' };
  return { valid: true };
}

export function validateMeme(formData) {
  if (!formData.get('meme')) return { valid: false, error: 'Image is required' };
  return { valid: true };
}
