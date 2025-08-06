const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  console.error('🔥 Error:', err);

  res.status(statusCode).json({
    status: err.status || 'error',
    message,
  });
};

export default globalErrorHandler;
