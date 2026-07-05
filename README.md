# Sistem Informasi Pengaduan Warga Desa

Backend API menggunakan:

- Java 21
- Spring Boot
- Spring Security
- JWT Authentication
- MySQL
- Spring Data JPA

## Fitur

- Authentication JWT
- CRUD User
- CRUD Role
- CRUD Kategori Laporan
- CRUD Status Laporan
- CRUD Laporan
- CRUD Komentar
- CRUD Foto Laporan

## Endpoint Auth

POST /auth/register

POST /auth/login

## Authentication

Authorization:

Bearer <token>

```
Authorization: Bearer eyJhbGciOi...
```