export interface ErrorResponse {
  error: string;
  message: string;
  statusCode: number;
  timestamp: string;
  path?: string;
}

export class APIError extends Error {
  statusCode: number;
  code?: string;

  constructor(message: string, statusCode: number = 500, code?: string) {
    super(message);
    this.name = "APIError";
    this.statusCode = statusCode;
    this.code = code;
  }
}

export class ValidationError extends APIError {
  constructor(message: string = "Data validasi gagal") {
    super(message, 400, "VALIDATION_ERROR");
  }
}

export class NotFoundError extends APIError {
  constructor(message: string = "Resource tidak ditemukan") {
    super(message, 404, "NOT_FOUND");
  }
}

export class UnauthorizedError extends APIError {
  constructor(message: string = "Akses tidak diizinkan") {
    super(message, 401, "UNAUTHORIZED");
  }
}

export class ForbiddenError extends APIError {
  constructor(message: string = "Akses dilarang") {
    super(message, 403, "FORBIDDEN");
  }
}

export class RateLimitError extends APIError {
  constructor(message: string = "Terlalu banyak permintaan") {
    super(message, 429, "RATE_LIMIT_EXCEEDED");
  }
}

export function createErrorResponse(
  error: unknown,
  path?: string,
): ErrorResponse {
  if (error instanceof APIError) {
    return {
      error: error.name,
      message: error.message,
      statusCode: error.statusCode,
      timestamp: new Date().toISOString(),
      path,
    };
  }

  if (error instanceof Error) {
    return {
      error: "InternalServerError",
      message: error.message || "Terjadi kesalahan internal server",
      statusCode: 500,
      timestamp: new Date().toISOString(),
      path,
    };
  }

  return {
    error: "UnknownError",
    message: "Terjadi kesalahan yang tidak diketahui",
    statusCode: 500,
    timestamp: new Date().toISOString(),
    path,
  };
}

export function handleAPIError(error: unknown, path?: string) {
  const errorResponse = createErrorResponse(error, path);

  // Log error untuk monitoring
  console.error("API Error:", {
    ...errorResponse,
    stack: error instanceof Error ? error.stack : undefined,
  });

  return Response.json(errorResponse, {
    status: errorResponse.statusCode,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
