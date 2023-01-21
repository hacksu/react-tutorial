function CheckoutForm() {
  const [checkLogin, setCheckLogin] = useState(false);
  const [checkCard, setCheckCard] = useState(false);
  const [checkTrust, setCheckTrust] = useState(false);
  const [rebuilding, setRebuilding] = useState(false);
  const rebuild = () => {
    setRebuilding(true);
    document.body.classList.add("shaking");
    setTimeout(() => {
      setRebuilding(false);
      document.body.classList.remove("shaking");
  	}, 2001);
  };
  return (
    <>
      <h1>Mitch Mart Checkout Form</h1>
      <div id="form">
        {rebuilding && (
          <img
            src="explosion.gif"
            id="explosion"
          />
        )}
        <div id="methods">
          <h3>Payment Method:</h3>
          <label>
            Existing Account
            <input
              type="checkbox"
              checked={checkLogin}
              onChange={(e) => {
                if (!rebuilding) {
                  setCheckLogin(e.target.checked);
                  rebuild();
                }
              }}
            />
          </label>
          <label>
            New Credit Card
            <input
              type="checkbox"
              checked={checkCard}
              onChange={(e) => {
                if (!rebuilding) {
                  setCheckCard(e.target.checked);
                  rebuild();
                }
              }}
            />
          </label>
          <label>
            Trust Me, Bro, Just Trust Me
            <input
              type="checkbox"
              checked={checkTrust}
              onChange={(e) => {
                if (!rebuilding) {
                  setCheckTrust(e.target.checked);
                  rebuild();
                }
              }}
            />
          </label>
        </div>
        <div id="login" className={rebuilding && "sliding-in"}>
          <h3>Login Information:</h3>
          <label>
            Username:
            <input type="text" disabled={!checkLogin || checkTrust} />
          </label>
          <label>
            Password:
            <input type="password" disabled={!checkLogin || checkTrust} />
          </label>
        </div>
        <div id="card" className={rebuilding && "sliding-in"}>
          <h3>Add New Card:</h3>
          <label>
            Card Number:
            <input type="text" disabled={!checkCard || checkTrust} />
          </label>
          <label>
            Expiration Date:
            <input type="text" disabled={!checkCard || checkTrust} />
          </label>
          <label>
            The Three Numbers on the Back:
            <input type="text" disabled={!checkCard || checkTrust} />
          </label>
        </div>
        <div style={{ textAlign: "end" }}>
          <button
            id="checkout"
            disabled={!(checkLogin || checkCard || checkTrust)}
          >
            Checkout
          </button>
        </div>
        <div>
            <a href="checkout-js.html">&lt; Vanilla JS Version</a>
        </div>
      </div>
    </>
  );
}

createRoot(document.getElementById("root")).render(<CheckoutForm />);
