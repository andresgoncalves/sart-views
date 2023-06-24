import { useEffect, useMemo, useState } from "react";
import {
  createUser,
  getUsers,
  onUserSnapshot,
  updateUser,
} from "../controllers/users";

export function useUsers() {
  /** @type {[import("../controllers/users").UserData[] | null, any]} */
  const [data, setData] = useState(null);

  useEffect(() => {
    async function load() {
      const users = await getUsers();
      setData(users);
    }
    load();
  }, []);

  const create = useMemo(
    () =>
      async function (
        /** @type {string} */ id,
        /** @type {import("../controllers/users").UserData} */ newData
      ) {
        await createUser(id, newData);
        setData([...data, { ...newData, id }]);
      },
    [data]
  );

  return { data, create };
}

/** @param {string} id */
export function useUser(id) {
  /** @type {[import("../controllers/users").UserData | null, any]} */
  const [data, setData] = useState(null);

  useEffect(() => {
    if (id) {
      const unsubscribePromise = onUserSnapshot(id, (data) => {
        setData(data);
      });
      return () => {
        unsubscribePromise.then((unsubscribe) => unsubscribe());
      };
    } else {
      setData(null);
    }
  }, [id]);

  const update = useMemo(
    () =>
      async function (
        /** @type {Partial<import("../controllers/users").UserData>} */ newData
      ) {
        await updateUser(id, newData);
        setData({ ...data, ...newData });
      },
    [id, data]
  );

  return { data, update };
}
