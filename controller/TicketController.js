const { Attachement } = require("../models/Attachement");
const { Response } = require("../models/Response");
const { Tickets } = require("../models/Tickets");
const { User } = require("../models/User");

exports.findAllTickets = (req, res) => {
  Tickets.findAll({
    include: [
      { model: User, attributes: ["id", "email"] },
      { model: Attachement, attributes: ["id", "filepath"] },
      { model: Response, attributes: ["id", "text", "user_id"] },
    ],
  })
    .then((tickets) => {
      res.status(200).json({ tickets: tickets });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error, message: error });
    });
};
exports.findAllTicketsByUser = (req, res) => {
  Tickets.findAll({
    include: [
      { model: User, attributes: ["id", "email"] },
      { model: Attachement, attributes: ["id", "filepath"] },
    ],
    where: { user_id: req.params.userid },
  })
    .then((ticket) => {
      res.status(200).json({ tickets: ticket });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};
exports.findTicketById = (req, res) => {
  Tickets.findAll({
    include: [
      { model: User, attributes: ["id", "email"] },
      { model: Attachement, attributes: ["id", "filepath"] },
      { model: Response, attributes: ["id", "text", "user_id"] },
    ],
    where: { id: req.params.id },
  })
    .then((ticket) => {
      res.status(200).json({ ticket: ticket });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};
exports.createTickets = (req, res) => {
  const { description, userId } = req.body;
  if (!(description == null || description == "")) {
    Tickets.create({ description: description, user_id: userId })
      .then((tickets) => {
        res
          .status(200)
          .json({ ticketId: tickets.id, message: "Tickets created!" });
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    res.json({ message: "Please fill the field description!" });
  }
};
exports.deleteTicket = (req, res) => {
  Tickets.destroy({ where: { id: req.params.id } })
    .then((response) => {
      res.json({ message: "Tickets deleted!" });
    })
    .catch((err) => {
      res.json({ message: "Unable to delete!" });
    });
};
exports.closeTicket = (req, res) => {
  if (req.params.id) {
    const ticket = Tickets.find({ where: { id: req.params.id } });
    console.log(ticket);
    if (ticket) {
      Tickets.update({ close: true }, { where: { id: req.params.id } }).then(
        (result) => {
          res.status(200).json({ message: `Ticket  ${req.params.id} Closed!` });
        }
      );
    } else {
      res.json({ message: "Ticket not found" });
    }
  } else {
    res.status(500).json({ message: "Bad parameter" });
  }
};
