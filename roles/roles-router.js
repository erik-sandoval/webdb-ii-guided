const knex = require("knex");
const router = require("express").Router();

const config = {
  client: "sqlite3",
  connection: {
    filename: "./data/rolex.db3"
  },
  useNullAsDefault: true
};

const db = knex(config);

router.get("/", (req, res) => {
  db("roles")
    .then(roles => {
      res.status(200).json(roles);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  db("roles")
    .where({ id: req.params.id })
    .first()
    .then(data => {
      if (data.length === 0) {
        res.status(404).json({ message: "could not find data" });
      } else {
        res.status(200).json(data);
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  db("roles")
    .insert(req.body, "id")
    .then(data => {
      res.status(201).json(data);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  db("roles")
    .where({ id: req.params.id })
    .update(req.body)
    .then(data => {
      if (data > 0) {
        res.status(200).json({ message: "successfully updated" });
      } else {
        res.status(404).json({ message: "no id matches the records" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  db("roles")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count > 0) {
        const unit = count > 1 ? "records" : "record";
        res.status(200).json({ message: `${count} ${unit} deleted` });
      } else {
        res.status(404).json({ message: "role not found" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
