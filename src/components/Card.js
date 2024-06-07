import React from 'react'

export default function Card(props) {
    const arr=[1,2,3,4,5,6];

    // Extracting options from props
    let piecesOptions = Object.keys(props.options);

    return (
        <div>
            <div className="card m-2" style={{"width": "15rem", "height":"20rem"}}>
                <img style={{ height:"150px",objectFit:"fill"}} src={props.foodImg} className="card-img-top p-1" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{props.foodName}</h5>
                    <p className="card-text">Some quick example </p>
                    <div className='container'>
                        {/* Dropdown for quantity */}
                        <select className='' >
                            <option value="" disabled selected>Qty</option>
                            {/* Mapping through array to create quantity options */}
                            {arr.map((e, i) => (
                                <option key={i + 1} value={i+1}>{`${i+1}`}</option>
                            ))}
                        </select>

                        {/* Dropdown for pieces options */}
                        <select className='d-inline m-2 h-100 bg-success rounded' >
                            {/* Mapping through piecesOptions to create pieces options */}
                            { piecesOptions.map((data)=> <option key={data} value={data}>{data}</option>) }
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}
