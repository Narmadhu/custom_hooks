import { useCallback, useState } from "react";

export default function useUserInfo(url) {
  const [userList, setUserList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log({ userList });

  const getUsers = useCallback(async () => {
    const getResponse = await fetch(url);
    const getData = await getResponse.json();
    setUserList([...userList, getData.results[0]]);
    const getCurrentIndex = userList.length;
    console.log({ getCurrentIndex });
    setCurrentIndex(getCurrentIndex);
  }, [url, userList]);

  const next = () => {
    const findNextUserInList = userList.findIndex(
      (user, i) => i === currentIndex + 1
    );
    console.log({ findNextUserInList });
    if (findNextUserInList !== -1) {
      setCurrentIndex(findNextUserInList);
      console.log(findNextUserInList);
    } else {
      getUsers();
    }
  };

  const previous = () => {
    const getCurrentIndex = currentIndex - 1;
    setCurrentIndex(getCurrentIndex);
  };

  return { userList, current: userList[currentIndex], next, previous };
}
