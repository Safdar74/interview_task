import React, { useState } from 'react'; 
import ReactPaginate from 'react-paginate'; #New

const NewsCard = (props) => {
	return (
		<div style={{ padding: '20' }}>
			<a href={props.url}>
				{props.title} by {props.author}
			</a>
		</div>
	);
};

function App() {

    const [hits, setHits] = useState([]);
     const [pageCount, setPageCount] = useState(1); #New
    const [isLoaded, setisLoaded] = useState(false);
    const [currentPage, setcurrentPage] = useState(0); #New
    const [query, setQuery] = useState('startups'); 

    const URL = `https://hn.algolia.com/api/v1/search?query=${query}&page=${currentPage}`;

    const handleFetch = () => {
		fetch(URL)
			.then(response => response.json())
			.then(body => {
				setData([...body.hits]);
                                setPageCount(body.nbPages); #New
                                setisLoaded(true); #New
			})
			.catch(error => console.error('Error', error));
	};

      #New
	const handlePageChange = (selectedObject) => {
		setcurrentPage(selectedObject.selected);
		handleFetch();
	};

return (
    <div>
         <label>Search</label>
        <input type="text" onChange={(event) => setQuery(event.target.value)} />
        <button onClick={handleFetch}>Get Data</button>

			{isLoaded ? (
				hits.map((item) => {
					return (
						<NewsCard
							url={item.url}
							title={item.title}
							author={item.author}
							key={item.objectID}
						/>
					);
				})
			) : (
				<div></div>
			)}    
                       #New
			{isLoaded ? (
				<ReactPaginate
					pageCount={pageCount}
					pageRange={2}
					marginPagesDisplayed={2}
					onPageChange={handlePageChange}
					containerClassName={'container'}
					previousLinkClassName={'page'}
					breakClassName={'page'}
					nextLinkClassName={'page'}
					pageClassName={'page'}
					disabledClassNae={'disabled'}
					activeClassName={'active'}
				/>
			) : (
				<div>Nothing to display</div>
			)} 

    </div>
);
  
}

export default App;