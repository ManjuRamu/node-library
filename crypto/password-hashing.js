const crypto = require('crypto');

// Function to generate a random salt
function generateSalt() {
  return crypto.randomBytes(16).toString('hex');
}

// Function to hash a password with a given salt
function hashPassword(password, salt) {
  const hash = crypto.createHmac('sha256', salt);
  hash.update(password);
  const hashedPassword = hash.digest('hex');
  return hashedPassword;
}

// Function to verify a password with the stored hash and salt
function verifyPassword(password, storedHash, salt) {
  const hashedPassword = hashPassword(password, salt);
  return hashedPassword === storedHash;
}

// Example usage
const password = 'userPassword';
const salt = "mysalt";
const hashedPassword = hashPassword(password, salt);
console.log(hashedPassword)
// Store hashedPassword and salt in the database

// Example for verifying a password during login
const userEnteredPassword = 'userPassword'; // Password entered by the user during login
// if (verifyPassword(userEnteredPassword, "99dc16ce6389b01b6328d8afc2f50c041aebd4e23b95af9878c26bb86f8f2c9b", "a9895f112be10d234d0406f031b1cab8")) {
//   console.log('Password is correct');
// } else {
//   console.log('Password is incorrect');
// }
