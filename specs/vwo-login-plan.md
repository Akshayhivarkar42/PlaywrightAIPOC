# VWO Invalid Login Test Plan

## Application Overview

Test plan to verify invalid-credentials handling on VWO login page. Assumptions: fresh browser session, not logged in. Success criteria: on submitting invalid credentials the app shows a visible error message indicating invalid credentials and does not navigate to the dashboard.

## Test Scenarios

### 1. VWO Login Suite

**Seed:** `tests/seed.spec.ts`

#### 1.1. Invalid credentials displays error

**File:** `specs/vwo-login-invalid.spec.ts`

**Steps:**
  1. Navigate to https://app.vwo.com/#/login
    - expect: Login page loads successfully
    - expect: Email and Password input fields visible
    - expect: Submit/Login button visible
  2. Enter invalid email invalid@example.com into the Email field (suggested selector: input[type="email"] or input[name="email"])
    - expect: Email field contains the entered value
  3. Enter invalid password wrongpass into the Password field (suggested selector: input[type="password"] or input[name="password"])
    - expect: Password field contains the entered value
  4. Click the Submit button (suggested selector: button[type="submit"] or button:has-text('Log in') / button:has-text('Sign in'))
    - expect: Form submission attempted
    - expect: Page does not navigate to authenticated dashboard
  5. Verify an error message is displayed indicating invalid credentials (examples: 'Invalid email or password', 'Incorrect email or password') and is visible to the user (suggested selector examples: .error, .alert, .toast, text=/invalid/i)
    - expect: An error message is visible on the page
    - expect: Error text indicates credentials are invalid
    - expect: User remains on the login page (no dashboard elements present)
  6. Negative checks: submit with empty email and/or password fields and verify appropriate validation messages appear
    - expect: Validation messages shown for required fields when empty
