import React from 'react'

export const CartComponent = ({item , increaseQuantity , decreaseQuantity , deleteItem }) => {    
    return (
        <div className="row chunking-wrapper" key={item.item_id} data-product-id={item.item_id} style={{ alignItems: 'center',margin:10,padding:0 }}>
            <div className="col-md-4">
                <div className="detail-chunk">
                    <div>
                        <img
                            src={item.reward ? item.reward : item.image}
                            alt={item.name || 'Product Image'}
                            style={{ maxWidth: '100%' , height:200 , borderRadius:20}}
                        />
                    </div>
                </div>
            </div>

            <div className="col-md-4">
                <div className="detail-chunk" style={{ textAlign: 'left' }}>
                    <p className="text-left" >{item.description || 'No description available'}</p>
                </div>
            </div>

            <div className="col-md-4" style={{ flexDirection: 'row' }}>
                <div className="button-container" style={{ flexDirection: 'row',display:"flex",alignItems:"center" }}>
                    <button type="button" className="altera decrescimo btn btn-outline-secondary btn-sm me-2" onClick={decreaseQuantity} disabled={item.quantity <= 1}>
                        <i className="bi bi-dash"></i>
                    </button>

                    <input type="text" id="txtAcrescimo" value={item.quantity} readOnly className="form-control d-inline-block w-25 text-center" />

                    <button type="button" className="altera acrescimo btn btn-outline-secondary btn-sm ms-2" onClick={increaseQuantity}>
                        <i className="bi bi-plus"></i>
                    </button>

                    <button type="button" className=" acrescimo btn btn-outline-danger btn-sm ms-2" style={{backgroundColor:"red"}} onClick={deleteItem}>
                    <i className="bi bi-trash" style={{color:"#fff"}}></i> 
                    </button>
                </div>
            </div>
        </div>
    )
}
