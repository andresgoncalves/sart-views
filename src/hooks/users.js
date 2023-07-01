import { useCallback, useEffect, useMemo, useState } from "react";
import {
  createUser,
  getUsers,
  onUserSnapshot,
  updateUser,
} from "../controllers/users";

/** @param {string[]} ids */
export function useUsers(ids) {
  /** @type {[import("../controllers/users").UserData[] | null, any]} */
  const [data, setData] = useState(null);

  useEffect(() => {
    async function load() {
      const users = await getUsers(ids);
      setData(users);
    }
    load();
  }, [ids]);

  const create = useCallback(
    async function (
      /** @type {string} */ id,
      /** @type {import("../controllers/users").UserData} */ newData
    ) {
      await createUser(id, newData);
      setData([...data, { ...newData, id }]);
    },
    [data]
  );

  return useMemo(() => ({ data, create }), [data, create]);
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

  const update = useCallback(
    async function (
      /** @type {Partial<import("../controllers/users").UserData>} */ newData
    ) {
      await updateUser(id, newData);
      setData({ ...data, ...newData });
    },
    [id, data]
  );

  return useMemo(() => ({ data, update }), [data, update]);
}
