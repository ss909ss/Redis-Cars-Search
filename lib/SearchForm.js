import { useState } from "react";

export default function CarForm() {

    const [hits,setHits] = useState([]);

    const search = async (event) => {
        const q = event.target.value;

        if (q.length > 2) {
            const params = new URLSearchParams({q})

            const res = await fetch('/api/search?' + params);

            const result = await res.json();
            console.log(result)
            setHits(result['cars']);
        }
    }

    return (<div>
        <input onChange={search} type="text"/>

        <ul className="list-group">
        {
          hits.map((hit) => (
            <li
              className="list-group-item d-flex justify-content-between align-items-start"
              key={hit.entityId}
            >
              <img width="50px" src={hit.Image} />

              <div className="ms-2 me-auto">
                <div className="fw-bold">
                  {hit.CarBrand} {hit.CarClass}
                </div>
                {hit.CarCost} 
              </div>
            </li>
          ))}
      </ul>
    </div>
    );
}