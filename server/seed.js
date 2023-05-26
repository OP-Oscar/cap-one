//importing credentials
require('dotenv').config()

//destructuring connection string
const {CONNECTION_STRING}= process.env

const Sequelize = require('sequelize');

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});


module.exports = {
    seed: (req, res) => {
        sequelize.query(`

        --TO DELETE TABLES

        drop table if exists users cascade;
        drop table if exists oauth cascade;
        drop table if exists items cascade;
        drop table if exists packages cascade;
        drop table if exists bookings cascade;
        drop table if exists events cascade;
        drop table if exists booked_items cascade;
        drop table if exists user_types cascade;
        drop table if exists type_assigned cascade;
        drop table if exists cart;


        -- TO CREATE TABLES

        CREATE TABLE "users" (
            "user_id" serial NOT NULL,
            "first_name" VARCHAR(255) NOT NULL,
            "last_name" VARCHAR(255) NOT NULL,
            "email" varchar NOT NULL,
            "phone" varchar NOT NULL,
            "address" varchar NOT NULL,
            "city" VARCHAR(255) NOT NULL,
            "state" VARCHAR(255) NOT NULL,
            "zip" VARCHAR(255) NOT NULL,
            CONSTRAINT "users_pk" PRIMARY KEY ("user_id")
        ) WITH (
        OIDS=FALSE
        );



        CREATE TABLE "oauth" (
            "oauth_id" serial NOT NULL,
            "hashed_pw" varchar NOT NULL,
            "user_id" integer NOT NULL,
            CONSTRAINT "oauth_pk" PRIMARY KEY ("oauth_id")
        ) WITH (
        OIDS=FALSE
        );



        CREATE TABLE "items" (
            "item_id" serial NOT NULL,
            "item_name" varchar NOT NULL,
            "item_qty" integer NOT NULL,
            "item_description" varchar NOT NULL,
            "item_price" DECIMAL NOT NULL,
            "item_url" varchar NOT NULL,
            CONSTRAINT "items_pk" PRIMARY KEY ("item_id")
        ) WITH (
        OIDS=FALSE
        );



        CREATE TABLE "packages" (
            "package_id" serial NOT NULL,
            "package_name" VARCHAR(255) NOT NULL,
            "package_descriptions" TEXT NOT NULL,
            "package_qty" integer NOT NULL,
            "package_price" DECIMAL NOT NULL,
            "package_url" varchar NOT NULL,
            CONSTRAINT "packages_pk" PRIMARY KEY ("package_id")
        ) WITH (
        OIDS=FALSE
        );



        CREATE TABLE "bookings" (
            "booking_id" serial NOT NULL,
            "event_id" integer NOT NULL,
            "booking_date" DATE NOT NULL,
            "total" DECIMAL NOT NULL,
            "payment_completed" BOOLEAN NOT NULL,
            CONSTRAINT "bookings_pk" PRIMARY KEY ("booking_id")
        ) WITH (
        OIDS=FALSE
        );


        CREATE TABLE "cart" (
            "cart_id" serial NOT NULL,
            "item_id" integer NOT NULL,
            "booking_date" DATE NOT NULL,
            CONSTRAINT "cart_pk" PRIMARY KEY ("cart_id")
        ) WITH (
          OIDS=FALSE
        );


        CREATE TABLE "events" (
            "event_id" serial NOT NULL,
            "customer_id" integer NOT NULL,
            "event_date" DATE NOT NULL,
            "event_address" varchar NOT NULL,
            "event_city" VARCHAR(255) NOT NULL,
            "event_zip" VARCHAR(255) NOT NULL,
            "event_state" VARCHAR(255) NOT NULL,
            "special_request" TEXT,
            CONSTRAINT "events_pk" PRIMARY KEY ("event_id")
        ) WITH (
        OIDS=FALSE
        );



        CREATE TABLE "booked_items" (
            "booked_items_id" serial NOT NULL,
            "event_id" integer NOT NULL,
            "package_id" integer,
            "package_qty" integer,
            "item_id" integer,
            "item_qty" integer,
            CONSTRAINT "booked_items_pk" PRIMARY KEY ("booked_items_id")
        ) WITH (
        OIDS=FALSE
        );



        CREATE TABLE "user_types" (
            "user_type_id" serial NOT NULL,
            "type" VARCHAR(255) NOT NULL,
            "type_description" TEXT NOT NULL,
            CONSTRAINT "user_types_pk" PRIMARY KEY ("user_type_id")
        ) WITH (
        OIDS=FALSE
        );



        CREATE TABLE "type_assigned" (
            "type_assigned_id" serial NOT NULL,
            "user_id" integer NOT NULL,
            "type_id" integer NOT NULL,
            CONSTRAINT "type_assigned_pk" PRIMARY KEY ("type_assigned_id")
        ) WITH (
        OIDS=FALSE
        );




        ALTER TABLE "oauth" ADD CONSTRAINT "oauth_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("user_id");



        ALTER TABLE "bookings" ADD CONSTRAINT "bookings_fk0" FOREIGN KEY ("event_id") REFERENCES "events"("event_id") ON DELETE CASCADE;

        ALTER TABLE "events" ADD CONSTRAINT "events_fk0" FOREIGN KEY ("customer_id") REFERENCES "users"("user_id");

        ALTER TABLE "booked_items" ADD CONSTRAINT "booked_items_fk0" FOREIGN KEY ("event_id") REFERENCES "events"("event_id") ON DELETE CASCADE;
        ALTER TABLE "booked_items" ADD CONSTRAINT "booked_items_fk1" FOREIGN KEY ("package_id") REFERENCES "packages"("package_id");
        ALTER TABLE "booked_items" ADD CONSTRAINT "booked_items_fk2" FOREIGN KEY ("item_id") REFERENCES "items"("item_id");
        
        ALTER TABLE "cart" ADD CONSTRAINT "cart_fk0" FOREIGN KEY ("item_id") REFERENCES "items"("item_id");

        ALTER TABLE "type_assigned" ADD CONSTRAINT "type_assigned_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("user_id");
        ALTER TABLE "type_assigned" ADD CONSTRAINT "type_assigned_fk1" FOREIGN KEY ("type_id") REFERENCES "user_types"("user_type_id");







        -- TO SEED TABLES 

        INSERT INTO users (first_name, last_name, email, phone, address, city, state, zip)
        VALUES
        ('Admin', 'User', 'admin@email.com', '1234567890', '123 Main St', 'Cityville', 'State1', '12345'),
        ('John', 'Doe', 'john@example.com', '1234567890', '123 Main St', 'Cityville', 'State1', '12345'),
        ('Jane', 'Smith', 'jane@example.com', '9876543210', '456 Elm St', 'Townville', 'State2', '54321'),
        ('Mike', 'Johnson', 'mike@example.com', '5555555555', '789 Oak Ave', 'Villageton', 'State3', '67890'),
        ('Emily', 'Brown', 'emily@example.com', '1112223334', '246 Maple Ln', 'Hamletown', 'State4', '98765'),
        ('Sarah', 'Davis', 'sarah@example.com', '9998887776', '135 Pine St', 'Citytown', 'State5', '43210'),
        ('Michael', 'Wilson', 'michael@example.com', '4443332227', '753 Walnut Ave', 'Villageton', 'State3', '56789'),
        ('Jessica', 'Lee', 'jessica@example.com', '6667778889', '852 Chestnut Ln', 'Townville', 'State2', '21098'),
        ('David', 'Anderson', 'david@example.com', '2223334445', '951 Birch St', 'Hamletown', 'State4', '87654'),
        ('Olivia', 'Taylor', 'olivia@example.com', '7778889990', '369 Oak Ave', 'Citytown', 'State5', '10987'),
        ('Ethan', 'Martinez', 'ethan@example.com', '5554443338', '468 Maple Ln', 'Cityville', 'State1', '56789');


        INSERT INTO items (item_name, item_qty, item_description, item_price, item_url)
        VALUES
        ('Balloons', 1000, 'Fifty beautiful high quality assorted color balloons which will add that pop to your party. Ballons can handle the sun and maintain color for outdoor events. Disclaime: Our ballons are still prone to popping when poked with pointy object.', 50.99, 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'),
        ('Banner', 15, 'Banners for that special occassion. We stock the following event type banners: birthday, aedding, anniversary, promotion, congratulatory, and graduation events', 5.99, 'https://plus.unsplash.com/premium_photo-1675881734934-9c514f13daaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'),
        ('Greenery Backdrop', 3, 'Georgous 10ft x 10ft greenery backdrops which can give off a unique nature vibe. Excellent piece to get a group picture!', 300.49, 'https://images.thdstatic.com/productImages/39275ef9-f58b-4cc0-997e-e2021c32d689/svn/artificial-hedges-lhy-12pcs-3l-64_600.jpg'),
        ('Wooden Backdrop', 2, 'Georgous 10ft x 10ft wooden backdrops which can give off a rustic vibe to your event. Materials consist of high quality wood, sun dried and hand painted. Excellent piece to get a group picture!', 280.49, 'https://www.windowsonthewaternj.com/wp-content/uploads/2021/05/Rustic-wooden-wedding-arch-with-retro-garland-decorated-with-flowers-for-wedding-ceremony.jpg'),
        ('Tablecloth', 10, 'Plastic white table cover which premium feel and high quality. This is not your typical Dollar Store tablecloth, it will impress!', 7.99, 'https://img.freepik.com/free-psd/table-with-tablecloth-bowl-with-fruits_176382-801.jpg?w=2000'),
        ('Flower centerpiece', 32, 'Flower table centerpieces which can help beatify your event. Flowers are hand selected for each event and carefully stored for peak freshness. ', 12.99, 'https://images.unsplash.com/photo-1531120364508-a6b656c3e78d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80'),
        ('Chair', 20, 'Sturdy white plastic chair. Can hold 400lb', 4.99, 'https://images.thdstatic.com/productImages/9bf082b9-ff1b-4d36-9ed6-57e52eb234f0/svn/white-plastic-development-group-folding-chairs-pdg-808-4pk-c3_600.jpg'),
        ('Balloon Garland', 40, 'Balloon garland which can come with desired balloon colors. Balloon garland streteches 10ft', 280.00, 'https://cdn.shopify.com/s/files/1/0568/9455/4301/products/black-110pack-balloon-garland-kit-arch-party-decorations-gold-silver-custom-made-free-shipping-680.jpg?v=1680196831'),
        ('Piñata', 1, 'Random party piñata filled with candy, the good kind.', 15.99, 'https://i.etsystatic.com/13701759/r/il/ce0efc/3806225688/il_1080xN.3806225688_dfzd.jpg'),
        ('Table', 10, '8ft rectangular table which can sit 8 people comfortably', 20.99, 'https://i5.walmartimages.com/asr/9f3dfa29-deee-4ff4-8c9a-97bc8a02152a_1.0ee1bdd2926da0ef218269ceda25239f.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF');


        INSERT INTO packages (package_name, package_descriptions, package_qty, package_price, package_url)
        VALUES
        ('Premium Outdoor Table', 'Simple yet elegant set up for an outdoor event. Package includes 4 wooden chairs, 1 table, 4 plastic plates, 1 flower centerpiece, and table cloth.', 5, 168.99, 'https://images.pexels.com/photos/9578718/pexels-photo-9578718.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'),
        ('Deluxe Picnic', 'Deluxe package which provides a nice relaxing set up which you can host a fun outdoor event. Package includes, 26 pillow, 18 sitting cushions, 18 plates, 18 cutps, 5 flower center pieces, 1 table runner, 1 extra long table (20ft), and some fancy lights with poles', 1, 645.99, 'https://images.squarespace-cdn.com/content/v1/5aa075a3c3c16aa2cb7f541b/1586456877487-IKVK8VWD8S48YYRNIEF5/IMG_1520%2B-%2B1%2Bcopy.jpg?format=1000w'),
        ('Baby-Shower', 'Beautiful decor for a baby shower type event. Balloon coloring can be modified upon request. Package includes: 4 Baby Box Letters, 1 wooden backdrop, 1 10ft balloon garland, 1 2ft balloon garland, and 1 Oh Baby sign.', 2, 180.99, 'https://m.media-amazon.com/images/I/71-4bDClBsS._AC_UF894,1000_QL80_.jpg'),
        ('The Arch', 'Simple yet elegant arch with pastel colors. Package includes one 8ft balloon garland, one 8ft arch, and 1 -Making Memories- sign', 3, 129.75, 'https://ae01.alicdn.com/kf/S35ea11e4e22644d58dde22b4265ffbdaL/Chrome-Gold-White-Balloon-Garland-Kit-Wedding-Arch-Arrangement-Bridal-Shower-Party-Photography-Backdrop-Birthday-Balloons.jpg_Q90.jpg_.webp'),
        ('All About Color', 'It is all about ballons with this one! You will get over 1k ballons with assorted colors and sizes. We had a hard time naming this package because of how much is involved! Leave your guests surprised and awed. Package includes: Over 1k balloons of assorted color and size, 10ft circular table, 12 chairs, 1 shinny talbe cloth, and 1 large flower center piece', 1, 1329.99, 'https://greenweddingshoes.com/wp-content/uploads/2020/12/thumb-BalloonArch.jpg');


        INSERT INTO user_types (type, type_description)
        VALUES 
            ('Admin', 'Role which is able to add/remove items from inventory, and see all booked events, cancel events, and update events'),
            ('Customer', 'Role for customers which are able to book events');


        INSERT INTO type_assigned (user_id, type_id)
        VALUES 
            (1, 1),
            (2, 2),
            (3, 2),
            (4, 2),
            (5, 2),
            (6, 2),
            (7, 2),
            (8, 2),
            (9, 2),
            (10, 2),
            (11, 2);


        INSERT INTO oauth (hashed_pw, user_id)
        VALUES 
            ('password1', 1),
            ('password2', 2),
            ('password3', 3),
            ('password4', 4),
            ('password5', 5),
            ('password6', 6),
            ('password7', 7),
            ('password8', 8),
            ('password9', 9),
            ('password10', 10),
            ('password11', 11);


        INSERT INTO events (customer_id, event_date, event_address, event_city, event_zip, event_state, special_request)
        VALUES
        (3, '05-29-2023', '789 Oak Ave', 'Villagetown', '98765', 'State3', 'Intimate garden setting with floral decorations'),
        (4, '06-05-2023', '321 Pine St', 'Countryside', '45678', 'State2', 'Rustic barn venue with string lights'),
        (2, '05-30-2023', '456 Elm St', 'Townville', '54321', 'State2', 'Indoor venue with DJ and dance floor'),
        (5, '06-01-2023', '555 Maple St', 'Metropolis', '54321', 'State4', 'Grand ballroom with live band and gourmet catering'),
        (3, '06-15-2023', '123 Main St', 'Cityville', '12345', 'State1', 'Outdoor venue with seating arrangements'),
        (2, '06-03-2023', '456 Elm St', 'Townville', '54321', 'State2', 'Indoor venue with DJ and dance floor');

        INSERT INTO bookings (event_id, booking_date, total, payment_completed)
        VALUES
            (1,'01-11-2023', 645.99, true),
            (2,'01-14-2023', 142.93, false),
            (3,'02-22-2023', 129.75, true),
            (4,'03-08-2023', 1329.99, true),
            (5,'01-25-2023', 259.80, false),
            (6,'04-18-2023', 280.00, false);


        INSERT INTO booked_items (event_id, package_id, package_qty, item_id, item_qty)
        VALUES
            (1, 2, 1, null, null),
            (2, null, null, 1, 2),
            (2, null, null, 7, 4),
            (2, null, null,10, 1),
            (3, 4, 1, null, null),
            (4, 5, 1, null, null),
            (5, null, null, 6, 20),
            (6, null, null, 8, 1);


        `).then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
    }
}
