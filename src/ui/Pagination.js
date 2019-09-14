import React from 'react'
import injectSheet from "react-jss";

const Pagination = ({pages, currentPage, classes, setCurrentPage}) => {
return <div className={classes.navigationPage}>
    {pages.map((p, index) => <span key={index} onClick={() => setCurrentPage(p)} className={currentPage === p ? classes.paginationActive : classes.pagination}>{p}</span>)}
</div>
};

let styles = {
    paginationActive: {
        cursor: 'pointer',
        border: '1px solid',
        background: '#65abd0',
        color: '#fff',
        padding: '2px',
    },

    pagination: {
        cursor: 'pointer',
        background: '#fff',
        color: '#000',
        padding: '2px',
        margin: '2px',
        '&:hover': {
            cursor: 'pointer',
            background: '#65abd0',
            color: '#000',
            padding: '2px',
        }
    },
    navigationPage: {
        marginTop: '10px',
        marginBottom: '10px',
    }

};
export default injectSheet(styles)(Pagination);