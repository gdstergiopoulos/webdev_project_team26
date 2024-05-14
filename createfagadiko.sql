CREATE TABLE public."FOODITEM"
(
    "itemID" integer NOT NULL DEFAULT nextval('"FOODITEM_new_itemID_seq"'::regclass),
    "foodname" character varying,
    "price" integer,
    "description" text,
    "onmenu" boolean,
    "img" text
);

ALTER TABLE public."FOODITEM" OWNER TO postgres;

ALTER TABLE ONLY public."FOODITEM"
    ADD CONSTRAINT "FOODITEM_pkey" PRIMARY KEY ("itemID");

CREATE SEQUENCE public."FOODITEM_new_itemID_seq"
	AS integer
	START with 1
	INCREMENT BY 1
	NO MINVALUE
	NO MAXVALUE
	CACHE 1;


ALTER SEQUENCE public."FOODITEM_new_itemID_seq" OWNER TO postgres;

ALTER SEQUENCE public."FOODITEM_new_itemID_seq" OWNED BY public."FOODITEM"."itemID";

CREATE TABLE public."RESERVATION" (
    "reservID" integer NOT NULL,
    desired_area character varying,
    numofpeople integer,
    date date,
    "time" time without time zone,
    datetimemade timestamp without time zone,
    "tableID" character varying,
    username character varying
);

ALTER TABLE public."RESERVATION" OWNER TO postgres;


CREATE TABLE public."TABLE" (
    "tableID" character varying NOT NULL,
    area character varying,
    capacity integer
);


ALTER TABLE public."TABLE" OWNER TO postgres;

CREATE TABLE public."USER" (
    username character varying NOT NULL,
    password character varying,
    "Fname" character varying,
    "Lname" character varying,
    mail character varying,
    phone character varying,
    role character varying
);


ALTER TABLE public."USER" OWNER TO postgres;

ALTER TABLE ONLY public."FOODITEM" ALTER COLUMN "itemID" SET DEFAULT nextval('public."FOODITEM_new_itemID_seq"'::regclass);

INSERT INTO public."FOODITEM" (foodname, description, price, onmenu, img) VALUES ('Burger Supreme', 'Indulge in our Burger Supreme, a culinary masterpiece that elevates the classic burger to new heights. Juicy Angus beef patty, perfectly grilled and topped with melted cheese, crispy bacon, fresh lettuce, ripe tomatoes, and our signature secret sauce, all sandwiched between a toasted brioche bun. Every bite is a symphony of flavors that will leave you craving more.', 10, true, 'media/menu/burger.png');
INSERT INTO public."FOODITEM" (foodname, description, price, onmenu, img) VALUES ('Pizza Margherita Fresca', 'Experience the true essence of Italian cuisine with our Pizza Margherita Fresca. A thin, crispy crust topped with tangy tomato sauce, creamy mozzarella cheese, and fragrant basil leaves, drizzled with extra virgin olive oil. Simple yet sublime, this classic pizza celebrates the purity of its ingredients, delivering a taste of Italy with every slice.', 10, true, '/media/menu/pizza.png');
INSERT INTO public."FOODITEM" (foodname, description, price, onmenu, img) VALUES ('Pita Gyros', 'Treat your taste buds to our Pita Gyros Deluxe, a Greek classic reimagined for the modern palate. Tender slices of seasoned rotisserie meat, freshly grilled and nestled in a warm, fluffy pita bread, then generously topped with crisp lettuce, juicy tomatoes, onions, and creamy tzatziki sauce. Bursting with Mediterranean flavors, this dish is a true delight for the senses.', 12, false, '/media/menu/gyros.png');
INSERT INTO public."FOODITEM" (foodname, description, price, onmenu, img) VALUES ('Chicken Caesar Salad', 'Savor the freshness of our Chicken Caesar Salad, a timeless favorite that never disappoints. Crisp romaine lettuce tossed with grilled chicken breast, crunchy croutons, and tangy Caesar dressing, finished with a sprinkle of Parmesan cheese. This salad is a perfect balance of flavors and textures, satisfying and delicious.', 9, false, '/media/menu/caesarsalad.png');
INSERT INTO public."FOODITEM" (foodname, description, price, onmenu, img) VALUES ('Sushi Platter', 'Embark on a culinary journey with our Sushi Platter, a delightful assortment of expertly crafted sushi rolls and sashimi. From classic California rolls to innovative specialty rolls, each piece is a work of art, showcasing the finest ingredients and meticulous preparation. Whether you are a sushi aficionado or a novice, this platter promises an unforgettable dining experience.', 18, false, '/media/menu/sushi.png');
INSERT INTO public."FOODITEM" (foodname, description, price, onmenu, img) VALUES ('Vegetable Pad Thai', 'Treat yourself to the vibrant flavors of our Vegetable Pad Thai, a Thai street food classic bursting with freshness and spice. Stir-fried rice noodles tossed with crisp vegetables, tofu, bean sprouts, and crushed peanuts, all coated in a tangy tamarind sauce. This dish is a harmonious blend of sweet, sour, and savory, guaranteed to tantalize your taste buds.', 11, false, '/media/menu/padthai.png');
INSERT INTO public."FOODITEM" (foodname, description, price, onmenu, img) VALUES ('Grilled Salmon', 'Indulge in the succulent flavors of our Grilled Salmon, a healthy and delicious choice for seafood lovers. Fresh Atlantic salmon fillet marinated in a zesty herb marinade, then grilled to perfection, resulting in tender, flaky fish with a subtle smoky char. Served with your choice of sides, this dish is a nutritious and flavorful option for any meal.', 16, false, '/media/menu/salmon.png');
INSERT INTO public."FOODITEM" (foodname, description, price, onmenu, img) VALUES ('Spaghetti Carbonara', 'Indulge in the creamy goodness of our Spaghetti Carbonara. Al dente pasta tossed in a rich sauce made with eggs, Parmesan cheese, crispy pancetta, and freshly ground black pepper. This classic Roman dish is comfort food at its finest, perfect for a cozy night in.', 11, false, 'null');

ALTER TABLE ONLY public."RESERVATION"
    ADD CONSTRAINT "RESERVATION_pkey" PRIMARY KEY ("reservID");

ALTER TABLE ONLY public."TABLE"
    ADD CONSTRAINT "TABLE_pkey" PRIMARY KEY ("tableID");

ALTER TABLE ONLY public."USER"
    ADD CONSTRAINT "USER_pkey" PRIMARY KEY (username);

ALTER TABLE ONLY public."RESERVATION"
    ADD CONSTRAINT "RESERVATION_tableID_fkey" FOREIGN KEY ("tableID") REFERENCES public."TABLE"("tableID") ON UPDATE RESTRICT ON DELETE RESTRICT;

ALTER TABLE ONLY public."RESERVATION"
    ADD CONSTRAINT "RESERVATION_username_fkey" FOREIGN KEY (username) REFERENCES public."USER"(username) ON UPDATE RESTRICT ON DELETE RESTRICT;

INSERT INTO public."USER" (username, password, "Fname", "Lname", mail, phone, role) VALUES ('gster', '123456', 'George', 'Stergiopoulos', 'gster@fagadiko.com', '1234567890', 'admin');
INSERT INTO public."USER" (username, password, "Fname", "Lname", mail, phone, role) VALUES ('dev', '1234', 'Γιώργος', 'Στεργιόπουλος', 'gdstergiopoulos@gmail.com', '6931152410', 'user');

INSERT INTO public."TABLE" (tableID, area, capacity) VALUES (1,'insidemain', 4);



CREATE SEQUENCE public."RESERVATION_reservID_seq" AS integer START with 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER SEQUENCE public."RESERVATION_reservID_seq" OWNER TO postgres;

ALTER TABLE ONLY public."RESERVATION" ALTER COLUMN "reservID" SET DEFAULT nextval('public."RESERVATION_reservID_seq"'::regclass);

INSERT INTO public."TABLE" ("tableID", area, capacity) VALUES (1, 'insidemain', 4);

INSERT INTO public."RESERVATION" ("desired_area", "numofpeople", "date", "time", "datatimemade", "tableID", "username")
VALUES ('insidemain', 2, '2022-12-31', '20:00', '2022-12-28 19:08', '1', 'test');

ALTER TABLE public."RESERVATION"
    ADD COLUMN comments text;

ALTER TABLE public."RESERVATION"
    ADD COLUMN status text;