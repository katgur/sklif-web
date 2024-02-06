import React, { useRef, memo } from 'react'
import TableItem from './TableItem';
import { useState } from 'react'
import sortIcon from '../../res/sort.svg';
import { useEffect } from 'react';

const chevronRight = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#64748B" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
    </svg>
)

const chevronLeft = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#64748B" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
    </svg>
)

/*
    header: string,
    columns: [string],
    items: 
    [
        {
            id: int,
            data: [string]
        }
    ],
    contextMenu: 
    [
        (string) => any
    ]
*/
function calcPages(pageCount, page) {
    let pages = [];
    for (let i = 0; i < pageCount; i++) {
        if (page < pageCount - 3) {
            if ((i >= page && i < page + 3) || i === pageCount - 1) {
                pages.push(i + 1);
            } else if (i === page + 3) {
                pages.push("...");
            }
        } else {
            if (i > pageCount - 4 || i === 0) {
                pages.push(i + 1);
            } else if (i === pageCount - 4) {
                pages.push("...");
            }
        }
    }
    return pages;
}

const pagination = (showingItemsLength, itemsCount, page, setPage, capacity) => {
    const pageCount = Math.floor(itemsCount / capacity) + (itemsCount % capacity !== 0);
    const pages = calcPages(pageCount, page);
    const onBackButtonClick = () => setPage(page - 1);
    const onForwardButtonClick = () => setPage(page + 1);
    const onPageButtonClick = (page) => {
        if (page !== "...") {
            setPage(page - 1);
        }
    }
    return (
        <div className="pagination">
            <span className="table-value">{`${showingItemsLength} из ${itemsCount}`}</span>
            <div>
                {page !== 0 && <span onClick={onBackButtonClick}>{chevronLeft}</span>}
                {pages.map((page1) => {
                    let style = (page === (page1 - 1)) ? "pagination-font__selected" : "pagination-font";
                    return (
                        <span key={page1} className={style} onClick={() => onPageButtonClick(page1)}>
                            {page1}
                        </span>
                    )
                })}
                {pageCount !== 0 && page + 1 !== pageCount && <span onClick={onForwardButtonClick}>{chevronRight}</span>}
            </div>
        </div>
    )
}

function SortableTableViewer({ columns, items, contextMenu, capacity, onItemClick }) {
    const [page, setPage] = useState(0);
    const [sortableItems, setSortableItems] = useState();
    const sortDirection = useRef(-1);

    useEffect(() => {
        if (!items) {
            return;
        }
        setSortableItems(items);
    }, [items])

    if (!sortableItems) {
        return;
    }
    
    capacity = capacity ? capacity : 5;
    const itemsCount = sortableItems.length;
    const showingItems = sortableItems.slice(capacity * page, Math.min(capacity * page + capacity, itemsCount));

    var onSort = (index) => {
        var newSortableItems = [...sortableItems];
        newSortableItems.sort((item1, item2) => {
            return item1.data[index] < item2.data[index] ? sortDirection.current : -sortDirection.current;
        });
        setSortableItems(newSortableItems);
        sortDirection.current = -sortDirection.current;
    }

    const listStyle = { gridTemplateColumns: "10fr ".repeat(columns.length) + "1fr" };
    return (
        <div className="card">
            <div className="list" style={listStyle}>
                {columns.map((column, index) => {
                    return (
                        <span key={column} className="table-column text-with-svg">
                            {column}
                            <span onClick={() => onSort(index)} className="transparent-badge">
                                <img width="18" height="18" src={sortIcon} alt="sort" />
                            </span>
                        </span>
                    )
                })}
                <span></span>
                {showingItems.map((item, index) => {
                    return <TableItem key={index} item={item} contextMenu={contextMenu} onClick={onItemClick} />
                })}
            </div>
            {pagination(showingItems.length, itemsCount, page, setPage, capacity)}
        </div>
    )
}

export default memo(SortableTableViewer);