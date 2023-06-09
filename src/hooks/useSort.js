import { useEffect, useState } from "react";

const useSort = () => {
    const [sorted, setSorted] = useState(null);

    const sort = (property, asc = true, defaultData = null) => {
        if (!defaultData) defaultData = [...sorted];
        setSorted(
            [...defaultData].sort((a, b) => {
                if (!a[property]) return asc ? 1 : -1;
                if (!b[property]) return asc ? -1 : 1;
                if (a[property] > b[property]) return asc ? 1 : -1;
                return asc ? -1 : 1;
            })
        );
    };
    return [sorted, sort];
};

export default useSort;
