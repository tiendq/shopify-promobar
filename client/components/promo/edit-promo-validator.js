const URL_VALIDATION_PATTERN = /^(?:(?:https?|HTTPS?):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-zA-Z\u00a1-\uffff0-9]-*)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]-*)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))\.?)(?::\d{2,})?(?:[/?#]\S*)?$/i;

function validateForm({ active, content, targetUrl, cta }) {
  let error = {
    barError: {
      content: false,
      targetUrl: false
    },
    ctaError: {
      title: false,
      targetUrl: false
    }
  };

  if (active && 0 === content.trim().length)
    error.barError.content = 'Content is required';

  let trimmed = targetUrl.trim();

  if (trimmed.length > 0 && !URL_VALIDATION_PATTERN.test(trimmed))
    error.barError.targetUrl = 'Target URL format is incorrect';

  if (cta.enabled && 0 === cta.title.trim().length)
    error.ctaError.title = 'Title is required';

  trimmed = cta.targetUrl.trim();

  // Enabled CTA requires a valid URL.
  if (cta.enabled && 0 === trimmed.length)
    error.ctaError.targetUrl = 'Target URL is required';

  if (trimmed.length > 0 && !URL_VALIDATION_PATTERN.test(trimmed))
    error.ctaError.targetUrl = 'Target URL format is incorrect';

  return error;
}

export {
  validateForm
};
