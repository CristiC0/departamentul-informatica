import { useState, useEffect } from "react";

const usePagination = (list, nrOfItemsOnPage) => {
    const [pages, setPages] = useState({ displayedPages: [], currentPage: 1 });
    const [itemsOnPage, setItemsOnPage] = useState([]);

    if (!list.length) return null;

    const nrOfPages = Math.ceil(list.length / nrOfItemsOnPage);

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

    useEffect(() => {
        const startPage =
            nrOfPages < 5 || pages.currentPage <= 3
                ? 1
                : pages.currentPage >= nrOfPages - 2
                ? nrOfPages - 4
                : pages.currentPage - 2;

        const endPage =
            nrOfPages < 5 || pages.currentPage + 2 > nrOfPages
                ? nrOfPages
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
    }, [pages.currentPage]);

    return {
        nrOfPages,
        displayedPages: pages.displayedPages,
        itemsOnPage,
        changePageNumber,
        currentPage: pages.currentPage,
        nextPage,
        previousPage,
    };
};

export default usePagination;
