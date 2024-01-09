# NestJS Project README

## Project Overview 🚀✨

This is a NestJS project that provides features for managing products, categories, and users. It includes functionality for both administrators and regular users.

## Features

### 1. Admin Features

- **Add or Remove Products and Categories:**
  - Administrators have the ability to add new products and categories to the system.
  - They can also remove existing products and categories.
  - Or manage the inventorys of products

- **User Management:**
  - Admins have the privilege to promote any user to an admin role.

### 2. User Features

- **Signup and Login:**
  - Users can create a new account by signing up with their details.
  - Existing users can log in using their credentials.

- **Profile Management:**
  - Users have the capability to update their profiles with new information.

- **Password Reset:**
  - Password reset functionality is implemented, allowing users to reset their passwords using a token also a mail is sent to regesterd mail id.

### 3. Product Access

- **View Products by Categories:**
  - Users can browse and filter products based on different categories.

- **Search by Keywords:**
  - Users have the ability to search for products using keywords.

- **Place Orders:**
  - Users can place orders for products by specifying the product ID.

### 4. Authorization

- **Admin-Only Access:**
  - Authorization is implemented to ensure that only administrators can access routes and features designated for admin functionalities.

### 5. File Upload Controller

- **Image Upload:**
  - The project includes a controller for file uploads, specifically designed for uploading images.
  - Filters are applied to ensure secure and efficient file handling.

## Getting Started

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Jatin-synsoft/nest_Shopping_Cart.git
   cd nest_Shopping_Cart
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Run the Application:**
   ```bash
   npm run start
   ```

4. **Access the Application:**
   - The application will be accessible at `http://localhost:3000` by default.

## Usage

- Navigate to the provided routes and endpoints based on your role (admin or user).
- Explore the various features such as product and category management, user profile updates, and file uploads.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the [ MY License](LICENSE).

Happy coding! 🚀✨
