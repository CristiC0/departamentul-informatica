import { useState, useEffect } from "react";

const usePagination = (list, nrOfItemsOnPage) => {
    const [pages, setPages] = useState({ displayedPages: [], currentPage: 1 });
    const [itemsOnPage, setItemsOnPage] = useState([]);
    const [info, setInfo] = useState({
        nrOfPages: null,
        changePageNumber: null,
        nextPage: null,
        previousPage: null,
    });

    useEffect(() => {
        const nrOfPages =
            list !== null ? Math.ceil(list.length / nrOfItemsOnPage) : null;

        const changePageNumber = (newPageNumber) => {
            setPages((pages) => ({ ...pages, currentPage: newPageNumber }));
        };

        const nextPage = () => {
            if (pages.currentPage < nrOfPages)
                changePageNumber(pages.currentPage + 1);
        };

        const previousPage = () => {
            if (pages.currentPage > 1) changePageNumber(pages.currentPage - 1);
        };

        setInfo({ nrOfPages, changePageNumber, nextPage, previousPage });
    }, [list]);

    useEffect(() => {
        if (list && list.length) {
            const startPage =
                info.nrOfPages < 5 || pages.currentPage <= 3
                    ? 1
                    : pages.currentPage >= info.nrOfPages - 2
                    ? info.nrOfPages - 4
                    : pages.currentPage - 2;

            const endPage =
                info.nrOfPages < 5 || pages.currentPage + 2 > info.nrOfPages
                    ? info.nrOfPages
                    : pages.currentPage <= 3
                    ? 5
                    : pages.currentPage + 2;

            const displayPages = [];
            for (let i = startPage; i <= endPage; i++) displayPages.push(i);

            setPages((pages) => ({ ...pages, displayedPages: displayPages }));

            const startItemIndex =
                pages.currentPage === 1
                    ? 0
                    : (pages.currentPage - 1) * nrOfItemsOnPage;
            const endItemIndex =
                pages.currentPage * nrOfItemsOnPage - 1 < list.length
                    ? pages.currentPage * nrOfItemsOnPage - 1
                    : list.length;

            setItemsOnPage(list.slice(startItemIndex, endItemIndex + 1));
        }
    }, [pages.currentPage, list]);

    return {
        nrOfPages: info.nrOfPages,
        displayedPages: pages.displayedPages,
        itemsOnPage,
        changePageNumber: info.changePageNumber,
        currentPage: pages.currentPage,
        nextPage: info.nextPage,
        previousPage: info.previousPage,
    };
};

export default usePagination;
