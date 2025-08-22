/**
 * Stores a value in localStorage with an expiration time
 * @param key The key to store the value under
 * @param value The value to store (will be stringified)
 * @param ttl Time to live in milliseconds
 */
export const setWithExpiry = (key: string, value: any, ttl: number) => {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

/**
 * Retrieves a value from localStorage if it hasn't expired
 * @param key The key to retrieve
 * @returns The stored value or null if expired/not found
 */
export const getWithExpiry = (key: string): any => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;

  const item = JSON.parse(itemStr);
  const now = new Date();

  // Compare the expiry time with the current time
  if (now.getTime() > item.expiry) {
    // If the item is expired, delete it from storage
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
};
