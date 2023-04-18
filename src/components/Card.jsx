import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import alanBtn from '@alan-ai/alan-sdk-web';
//rafce
const Card = () => {
  const [mainCard, setMainCard] = useState([]);
  const [card, setCard] = useState([]);
  const [isModal, setModal] = useState(false);

  const AddCard = (item) => {
    setCard((prev) => [...prev, item]);
    toast.success("Product add Card");
  };

  useEffect(() => {
   /*  fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setMainCard(json)); */
      alanBtn({
       key: '1bf04415620fdeaaaf6d8ac04ac7353f2e956eca572e1d8b807a3e2338fdd0dc/stage',
       onCommand: (commandData) => {
         if (commandData.command === 'getMenu') {
            setMainCard(commandData?.data)
         }
       }
   });
  }, []);
  console.log(mainCard , 'dd');
  return (
    <div>
      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row  row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {mainCard.map((item) => (
              <div key={item?.id} className="col">
                <div
                  className="card shadow-sm p-3"
                  style={{ minHeight: "550px" }}
                >
                  <div className="card-title">
                    <h4 className="text-muted text-center">
                      Product {item?.id}
                    </h4>
                  </div>
                  <img
                    src={item?.image}
                    width={"100%"}
                    height={"400px"}
                    alt={item?.title}
                    className="bg-placeholder card-image-top"
                  />
                  <div className="card-body">
                    <p className="card-text">{item?.title.slice(0, 20)}</p>
                    <p className="card-text fw-lighter">
                      {item?.description.slice(0, 100)}
                    </p>
                  </div>
                  <div className="card-footer d-flex justify-content-between align-items-center">
                    <div>
                      <span>{item?.category}</span>
                    </div>
                    <span className="text-muted">$ {item?.price}</span>
                  </div>
                  <button
                    onClick={() => AddCard(item)}
                    className="mt-3 btn btn-outline-primary"
                  >
                    Add Card
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="fixed-top m-3" onClick={() => setModal(true)}>
          <button type="button" className="btn btn-primary position-relative">
            Card
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {card?.length}
              <span className="visually-hidden">unread messages</span>
            </span>
          </button>
        </div>
        {isModal && (
          <div
            class="modal"
            style={{ display: "block", background: "rgba(0,0,0,0.8)" }}
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Modal title</h5>
                  <button
                    onClick={() => setModal(false)}
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  {card.map((item) => (
                    <div className="card mb-3">
                      <div className="row g-0">
                        <div className="col-md-4">
                          <img
                            src={item?.image}
                            alt={item?.title}
                            className="img-fluid rounded-start"
                          />
                        </div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <h5 className="card-title">{item?.title}</h5>
                            <p className="card-text text-muted">
                              {item?.description.slice(0, 100)}
                            </p>
                            <p className="card-text">
                              <div className="text-muted">${item?.price}</div>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={() => setModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
