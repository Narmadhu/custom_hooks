import useUserInfo from "./customhook/useUserInfo";

function App() {
  const { userList, current, next, previous } = useUserInfo(
    "https://randomuser.me/api"
  );
  console.log({ current });
  return (
    <div>
      <p>AllUsers:</p>
      {userList.map((user) => (
        <b key={user.name.first}>{user.name.first}</b>
      ))}
      <p>Current User:</p>
      {current !== undefined && <b>{current.name.first}</b>}
      <button onClick={() => previous()}>previous</button>
      <button onClick={() => next()}>Next</button>
    </div>
  );
}

export default App;
