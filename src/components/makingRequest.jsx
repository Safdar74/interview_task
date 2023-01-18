import React, { useState } from 'react';

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
    const [isLoaded, setisLoaded] = useState(false);
    const [query, setQuery] = useState('startups'); 

    const URL = `https://hn.algolia.com/api/v1/search?query=${query}`;

    const handleFetch = () => {
		fetch(URL)
			.then(response => response.json())
			.then(body => {
				setData([...body.hits]);
			})
			.catch(error => console.error('Error', error));
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
    </div>
);
  
            }

export default App;