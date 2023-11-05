import { useCallback, useState } from "react";

export default function useUserInfo(url) {
  const [userList, setUserList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const getUsers = useCallback(async () => {
    setLoading(true);
    try {
      const getResponse = await fetch(url);
      const getData = await getResponse.json();
      setLoading(false);
      setUserList([...userList, getData.results[0]]);
      const getCurrentIndex = userList.length;
      setCurrentIndex(getCurrentIndex);
    } catch (error) {
      setLoading(false);
    }
  }, [url, userList]);

  const next = () => {
    const findNextUserInList = userList.findIndex(
      (user, i) => i === currentIndex + 1
    );
    if (findNextUserInList !== -1) {
      setCurrentIndex(findNextUserInList);
    } else {
      getUsers();
    }
  };

  const previous = () => {
    if (currentIndex !== undefined) {
      const getCurrentIndex = currentIndex - 1;
      setCurrentIndex(getCurrentIndex);
    } else {
      setCurrentIndex(0);
    }
  };

  return {
    userList,
    current: userList[currentIndex],
    next,
    previous,
    currentIndex,
    loading,
  };
}
