# OptimizeMyResume.pro Backend

A complete backend system for the OptimizeMyResume.pro professional resume optimization service.

## Features

- **Order Management**: Complete order processing workflow
- **File Upload**: Secure resume file handling with validation
- **Payment Processing**: Stripe integration for secure payments
- **Email Notifications**: Automated email system for order updates
- **Admin Panel**: Complete admin interface for order management
- **Security**: JWT authentication, rate limiting, input validation

## API Endpoints

### Public Endpoints

#### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:identifier` - Get order by ID or order number

#### File Upload
- `POST /api/upload/resume` - Upload resume file
- `GET /api/upload/download/:filename` - Download file

#### Payments
- `POST /api/payments/create-payment-intent` - Create payment intent
- `POST /api/payments/confirm-payment` - Confirm payment
- `POST /api/payments/webhook` - Stripe webhook endpoint
- `GET /api/payments/status/:orderId` - Get payment status

### Admin Endpoints (Requires Authentication)

#### Authentication
- `POST /api/admin/login` - Admin login

#### Dashboard
- `GET /api/admin/dashboard/stats` - Dashboard statistics
- `GET /api/admin/analytics` - Analytics data

#### Order Management
- `GET /api/admin/orders` - List orders with pagination
- `GET /api/admin/orders/:id` - Get order details
- `PATCH /api/admin/orders/:id/status` - Update order status
- `POST /api/admin/orders/:id/notes` - Add note to order

#### Admin Management
- `POST /api/admin/admins` - Create new admin user

#### File Management
- `POST /api/upload/delivery/:orderId` - Upload delivery files
- `DELETE /api/upload/:filename` - Delete file

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration values.

4. Create initial admin user:
   ```bash
   node scripts/createAdmin.js
   ```

5. Start the server:
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port | No (default: 3001) |
| `NODE_ENV` | Environment | No (default: development) |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | JWT signing secret | Yes |
| `EMAIL_SERVICE` | Email service provider | Yes |
| `EMAIL_USER` | Email username | Yes |
| `EMAIL_PASS` | Email password/app password | Yes |
| `STRIPE_SECRET_KEY` | Stripe secret key | Yes |
| `STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | Yes |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret | Yes |
| `ADMIN_EMAIL` | Initial admin email | Yes |
| `ADMIN_PASSWORD` | Initial admin password | Yes |
| `FRONTEND_URL` | Frontend URL for CORS | Yes |

## Database Models

### Order
- Customer information (name, email, phone)
- Package details and pricing
- Job information (industry, position)
- File information (uploaded resume)
- Order status and payment tracking
- Delivery files and completion data

### Admin
- Admin user management
- Role-based access control
- Password hashing with bcrypt

## Security Features

- JWT authentication for admin endpoints
- Rate limiting to prevent abuse
- Input validation and sanitization
- File upload restrictions and validation
- CORS configuration
- Helmet.js for security headers

## Email System

Automated email notifications for:
- Order confirmation
- Admin notifications
- Status updates
- Delivery notifications

All emails use responsive HTML templates.

## Payment Processing

Secure payment processing with Stripe:
- Payment intent creation
- Webhook handling for payment events
- Refund processing
- Customer management

## File Upload

Secure file handling:
- File type validation (PDF, DOC, DOCX)
- File size limits
- Secure file storage
- File download with security checks

## Admin Features

- Dashboard with order statistics
- Order management with filtering and search
- Payment tracking and refund processing
- File upload for delivery
- Analytics and reporting
- Admin user management

## API Response Format

Success Response:
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

Error Response:
```json
{
  "error": "Error Type",
  "message": "Error description"
}
```

## Testing

```bash
npm test
```

## Deployment

1. Set up production environment variables
2. Configure MongoDB database
3. Set up Stripe webhooks
4. Configure email service
5. Deploy to your hosting platform

## Support

For support and questions, contact: admin@optimizemyresume.pro