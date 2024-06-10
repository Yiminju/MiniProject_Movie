//User.jsx
export default function User({ user: { photoURL, displayName } }) {
  return (
    <div className="userInfo">
      <img src={photoURL} alt={displayName} />
      <span>{displayName}</span>
    </div>
  );
}
