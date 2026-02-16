-- ====================================
-- DATABASE SCHEMA
-- Backend API with RBAC
-- ====================================

-- Drop tables if exists (untuk development)
DROP TABLE IF EXISTS role_permissions CASCADE;
DROP TABLE IF EXISTS permissions CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS roles CASCADE;

-- ====================================
-- TABLE: roles
-- ====================================
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ====================================
-- TABLE: permissions
-- ====================================
CREATE TABLE permissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ====================================
-- TABLE: role_permissions
-- ====================================
CREATE TABLE role_permissions (
    id SERIAL PRIMARY KEY,
    role_id INTEGER NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    permission_id INTEGER NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(role_id, permission_id)
);

-- ====================================
-- TABLE: users
-- ====================================
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role_id INTEGER NOT NULL REFERENCES roles(id) ON DELETE RESTRICT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ====================================
-- INDEXES untuk performa
-- ====================================
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_role_id ON users(role_id);
CREATE INDEX idx_role_permissions_role_id ON role_permissions(role_id);

-- ====================================
-- SEED DATA - Roles
-- ====================================
INSERT INTO roles (name, description) VALUES
('admin', 'Administrator with full access'),
('user', 'Regular user with limited access');

-- ====================================
-- SEED DATA - Permissions
-- ====================================
INSERT INTO permissions (name, description) VALUES
('user:read', 'View user profiles'),
('user:write', 'Create and update users'),
('user:delete', 'Delete users'),
('admin:dashboard', 'Access admin dashboard'),
('public:access', 'Access public resources');

-- ====================================
-- SEED DATA - Role Permissions
-- ====================================
-- Admin mendapat semua permission
INSERT INTO role_permissions (role_id, permission_id) VALUES
(1, 1), -- admin: user:read
(1, 2), -- admin: user:write
(1, 3), -- admin: user:delete
(1, 4), -- admin: admin:dashboard
(1, 5); -- admin: public:access

-- User hanya mendapat permission terbatas
INSERT INTO role_permissions (role_id, permission_id) VALUES
(2, 1), -- user: user:read
(2, 5); -- user: public:access

-- ====================================
-- SEED DATA - Sample Users
-- Password untuk semua user: "password123"
-- Hash dibuat dengan bcrypt rounds=10
-- ====================================
INSERT INTO users (username, email, password, role_id) VALUES
('admin', 'admin@example.com', '$2b$10$rZ5YlrLvJhqGqH5YlrLvJeYlrLvJhqGqH5YlrLvJhqGqH5YlrLvJO', 1),
('john_doe', 'john@example.com', '$2b$10$rZ5YlrLvJhqGqH5YlrLvJeYlrLvJhqGqH5YlrLvJhqGqH5YlrLvJO', 2),
('jane_smith', 'jane@example.com', '$2b$10$rZ5YlrLvJhqGqH5YlrLvJeYlrLvJhqGqH5YlrLvJhqGqH5YlrLvJO', 2);

-- ====================================
-- FUNCTION: Update timestamp otomatis
-- ====================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger untuk users table
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger untuk roles table
CREATE TRIGGER update_roles_updated_at BEFORE UPDATE ON roles
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();