E-Commerce Web App (with Firebase)

----- Project Overview -----
This project is an advanced e-commerce application built with React, TypeScript, and Firebase. It includes secure user authentication, Firestore CRUD operations, and order management.

----- Project Features -----
This project features:

- User Management: Users can register and login with Firebase Authentication; Users can create, read, update, and delete their user profile; Users can logout

- Product Management: Store products and/or animal information in Firebase Firestore; Create, read, update, and delete products listings; Fetch product listings dynamically

- Order Management: Store user order history in Firestore; Users can view past orders with order details

---- Tech Used ----

- Frontend: React, TypeScript, React Router, React Query
- Backend: Firebase Authentication, Firestore
- Styling: CSS Modules, Custom Style Objects
- Build Tool: Vite
- Jest & React Testing Library (unit and integration tests)
- GitHub Actions (CI/CD automation)
- Vercel (autmomated deployment)

----- Installation Steps -----

1. Clone the repository
   git clone https://github.com/SabrinaLamprecht/Advanced-React-E-Commerce-Web-App.git
   cd Advanced-React-E-Commerce-Web-App
2. Install dependencies
   npm install
3. Run the application: npm run dev
   Open http://localhost:5173 in your browser

   Alternatively...

4. Navigate to the link provided: https://advanced-react-e-commerce-web-k58i32hf1.vercel.app/

----- Usage -----

1. Register Page

   - New users can register with their full name, email, and password using Firebase Authentication
   - Upon registration, a corresponding user document in the users collection in Firestore is created

2. Login / Logout

   - Login: Users are authenticated with Firebase Authentication using their email/password
   - Logout: Logout button for users to sign out with

3. Home Page

   - Displays all products fetched from Firestore
   - Category dropdown filters product listings dynamically
   - Add products and/or animals to cart using the "Add to Cart" button

4. Shopping Cart

   - Accessible from the navbar cart icon
   - Adjust product quantities or remove products
   - View total price and item count
   - Checkout clears cart and provides confirmation

5. Profile

   - Displays the following infomation: Display Name & Email
   - Contains Edit Profile button to edit Display Name
   - Contains Delete Account button to delete entire account
   - Contains View Order History button to navigate to the user's Order History information

6. Order History Page

   - Allow users to access a list of their previous carts, serving as a history of their orders
   - Displays each cart entry with: cart ID, date of creation, total price of the order
   - Enables users to click on individual orders to view the full details, including: the list of items (with title, image, and count), the total price of the order

7. Admin Panel

   - Displays all the listings that were created via a products collection in Firestore to store product data
   - Allows a signed in user to create, update, and delete listings that will be shown on the Home page

----- Folder Structure -----

src/
├── **tests**/
│ └── LogOut.test.jsx.ts
│ └── ProductForm.test.jsx
│ └── ShoppingCart.test.jsx
├── api/
│ └── api.ts
├── components/
│ ├── NavBar.tsx
│ ├── ProductCard.tsx
│ ├── ProductForm.tsx
├── context/
│ ├── AuthContext.tsx
│ ├── ProductContext.tsx
├── lib/
│ └── firebase.ts
├── pages/
│ └── AdminProductManager.tsx
│ └── Home.tsx
│ └── Login.tsx
│ └── Logout.tsx
│ └── OrderDetails.tsx
│ └── OrderHistory.tsx
│ └── Profile.tsx
│ └── Register.tsx
│ └── ShoppingCart.tsx
├── redux/
│ ├── cartSlice.ts
│ └── store.ts
├── styles/
│ ├── auth-styles.ts
│ └── cardStyles.ts
│ └── NavBar.css
├── types/
│ └── types.ts
├── App.tsx
└── main.tsx
