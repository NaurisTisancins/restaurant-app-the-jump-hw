exports.productCategories = ["starter", "main", "dessert", "beverage"];

exports.tables = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

exports.OrderPermission = Object.freeze({
  CreateOrders: "create:orders",
  DeleteOrders: "delete:orders",
  ReadOrders: "read:orders",
  UpdateOrders: "update:orders",
  CreateOwnOrders: "create:orders:own",
  DeleteOwnOrders: "delete:orders:own",
  ReadOwnOrders: "read:orders:own",
  UpdateOwnOrders: "update:orders:own"
});

exports.ProductPermission = Object.freeze({
  CreateProducts: "create:products",
  DeleteProducts: "delete:products",
  ReadProducts: "read:products",
  UpdateProducts: "update:products",
});

exports.ReservationPermission = Object.freeze({
  CreateReservation: "create:reservation",
  DeleteReservation: "delete:reservation",
  ReadReservation: "read:reservation",
  UpdateReservation: "update:reservation",
  CreateOwnReservation: "create:reservation:own",
  DeleteOwnReservation: "delete:reservation:own",
  ReadOwnReservation: "read:reservation:own",
  UpdateOwnReservation: "update:reservation:own",
});
