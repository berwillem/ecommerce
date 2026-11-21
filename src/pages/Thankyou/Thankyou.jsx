import "./Thankyou.css"
const Thankyou = () => {
  return (
    <div className="thankyou-page">
      <div className="thankyou-card">

        <div className="success-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M5 12l4 4L19 6" />
          </svg>
        </div>

        <span className="thankyou-label">
          PAYMENT SUCCESSFUL
        </span>

        <h1>Thank You for Your Purchase!</h1>

        <p className="thankyou-description">
          Your order has been successfully placed.
          We truly appreciate your trust in us and
          hope you enjoy your new products!
        </p>

        <div className="order-info">
          <div>
            <span>Order Status</span>
            <strong className="status">Confirmed</strong>
          </div>

          <div>
            <span>Order Number</span>
            <strong>#ORD-2026-001</strong>
          </div>
        </div>

        <p className="email-message">
          A confirmation email with your order details
          will be sent to your email address.
        </p>

        <div className="thankyou-buttons">
          <a href="/" className="shop-button">
            Continue Shopping
            <span>→</span>
          </a>

          <a href="/orders" className="order-button">
            View My Orders
          </a>
        </div>

        <div className="thankyou-footer">
          <p>Need help? Contact our support team.</p>
          <span>Thank you for choosing us 🎁🛒</span>
        </div>

      </div>
    </div>
  );
};

export default Thankyou;
