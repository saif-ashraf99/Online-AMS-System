  <h1>Online AMS System</h1>

  <p>The project called "AMS" (Auction Management System) is designed to help users buy or sell items through an online platform.</p>

  <h2>Requirements</h2>

  <p>To access the AMS dashboard, Admin, Seller, and Buyer must log in first. The following are the requirements for each user type:</p>

  <h3>Admin</h3>

  <ul>
    <li>Login/Logout.</li>
    <li>Manage new accounts (accept or reject).</li>
    <li>View transaction results.</li>
  </ul>

  <h3>Seller</h3>

  <ul>
    <li>Login/Logout/Register.</li>
    <li>Manage auctions (CRUD).</li>
    <li>Post an auction within a specific time.</li>
    <li>Show the activity history of their auctions with the winners.</li>
  </ul>

  <h3>Bidder</h3>

  <ul>
    <li>Login/Logout/Register.</li>
    <li>Filter auction by name or category.</li>
    <li>Bid on the desired auction.</li>
    <li>View won auctions and their purchase history.</li>
  </ul>

  <h2>Database Models</h2>

  <p>The database models for this system are as follows:</p>

  <ul>
    <li>User model consists of:</li>
    <ul>
      <li>Email</li>
      <li>Password</li>
      <li>Phone</li>
      <li>Status (Active, Inactive)</li>
      <li>Type (Admin, Seller, Bidder)</li>
    </ul>
    <li>Auction models consist of:</li>
    <ul>
      <li>Name</li>
      <li>Description</li>
      <li>Start date</li>
      <li>End date</li>
    </ul>
  </ul>

  <h4>I made this project using Node.js and Express.js in the backend, and React.js in the frontend.</h4>
