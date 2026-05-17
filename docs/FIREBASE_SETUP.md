# Firebase Setup Instructions

## Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your Firebase project values:
   - Get these values from Firebase Console > Project Settings > General tab
   - The current `.env` file contains the values for your `calypsoapp-60ee9` project

## Firestore Database Rules

To enable the wishlist functionality, you need to update your Firestore security rules.

1. Go to the Firebase Console: https://console.firebase.google.com/
2. Select your project: `calypsoapp-60ee9`
3. Navigate to **Firestore Database** > **Rules**
4. Replace the current rules with the content from `firestore.rules` file

## Key Changes Made

- Added a new `wishlist` collection that allows public write access for email collection
- Users can only create new documents (not read existing ones for privacy)
- Email addresses are used as document IDs to prevent duplicates

## Testing

The wishlist component will automatically:
- Validate email addresses
- Prevent duplicate entries
- Store emails with timestamp and source information
- Show success/error messages to users

## Security Notes

- Only creation (write) is allowed for the wishlist collection
- No read access is granted to maintain user privacy
- The rules prevent users from viewing other people's email addresses