import React, { useRef, memo } from 'react'
import TableItem from './TableItem';
import { useState } from 'react'
import sortIcon from './sort.svg';
import { useEffect } from 'react';
import chevronLeft from './chevron-left.svg';
import chevronRight from './chevron-right.svg';
import './SortableTableViewer.css';

function calcPages(pageCount, page) {
    const pages = [];
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

const pagination = (showingItemsLength, itemsCount, pageNum, setPageNum, capacity) => {
    const pageCount = Math.floor(itemsCount / capacity) + (itemsCount % capacity !== 0);
    const pages = calcPages(pageCount, pageNum);
    const onBackButtonClick = () => setPageNum(pageNum - 1);
    const onForwardButtonClick = () => setPageNum(pageNum + 1);
    const onPageButtonClick = (page) => page !== "..." && setPageNum(page - 1);
    return (
        <div className="table-viewer__pagination">
            <span className="table-value">{`${showingItemsLength} из ${itemsCount}`}</span>
            <div>
                {pageNum !== 0 && <button onClick={onBackButtonClick}><img src={chevronLeft} alt="left" /></button>}
                {pages.map((page1) => {
                    const style = "table-viewer__page" + ((pageNum === (page1 - 1)) && "--selected");
                    return (
                        <span key={page1} className={style} onClick={() => onPageButtonClick(page1)}>
                            {page1}
                        </span>
                    )
                })}
                {pageCount !== 0 && pageNum + 1 !== pageCount && <button onClick={onForwardButtonClick}><img src={chevronRight} alt="right" /></button>}
            </div>
        </div>
    )
}

function SortableTableViewer({ columns, items, contextMenu, onItemClick, capacity = 5 }) {
    const [page, setPage] = useState(0);
    const [sortableItems, setSortableItems] = useState();
    const sortDirection = useRef(-1);

    useEffect(() => {
        setSortableItems(items);
    }, [items])

    if (!sortableItems) {
        return;
    }

    const onSort = (index) => {
        var newSortableItems = [...sortableItems];
        newSortableItems.sort((item1, item2) => {
            return item1.data[index] < item2.data[index] ? sortDirection.current : -sortDirection.current;
        });
        setSortableItems(newSortableItems);
        sortDirection.current = -sortDirection.current;
    }

    const showingItems = sortableItems.slice(capacity * page, Math.min(capacity * page + capacity, sortableItems.length));

    return (
        <div className="card">
            <div className="table-viewer__list" style={{ gridTemplateColumns: "10fr ".repeat(columns.length) + "1fr" }}>
                {columns.map((column, index) => {
                    return (
                        <span key={column} className="table-viewer__header table-viewer__cell">
                            <span>
                                {column}
                            </span>
                            <span onClick={() => onSort(index)} className="table-viewer__sort">
                                <img width="18" height="18" src={sortIcon} alt="sort" />
                            </span>
                        </span>
                    )
                })}
                <span className="table-viewer__header table-viewer__cell"></span>
                {showingItems.map((item, index) => {
                    return <TableItem key={index} item={item} contextMenu={contextMenu} onClick={onItemClick} />
                })}
            </div>
            {pagination(showingItems.length, sortableItems.length, page, setPage, capacity)}
        </div>
    )
}

export default memo(SortableTableViewer);