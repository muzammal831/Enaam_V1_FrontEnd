import React from 'react'

export const WinnerComponent = ({winner,data,index}) => {
  return (
    <div key={index} className="mb-3 col-lg-4 col-md-6 grids-feature">
    <div className='glow' style={{backgroundColor:"white",borderRadius:"15px"}}>
      <img className="img-fluid" style={{borderRadius:"15px"}} src={winner?.product?.reward?.image} alt=" " />
      <h4><a href="" className="title-head">Congratulations</a></h4>
      <h5>{winner?.winnerName}</h5>
      <p>on Winning <b style={{ color: '#000' }}>{winner?.product?.reward?.name}</b></p>
      <small>Ticket no: LS-00143-35908-d</small> <br />
      <small>Announced {data}</small>
    </div>
  </div>
  )
}
