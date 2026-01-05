
export function generateUserId() {
  // Get current date in YYYYMMDD format
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const dateStr = `${year}${month}${day}`;

  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let randomStr = '';
  for (let i = 0; i < 6; i++) {
    randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  return `USER-${dateStr}-${randomStr}`;
}

/** 
  @param {string} id
  @returns {boolean}
*/
  
export function isValidUserId(id) {
    if (typeof id !== 'string') return false;
  const pattern = /^USER-\d{8}-[0-9A-Z]{6}$/;
  return pattern.test(id);
}
