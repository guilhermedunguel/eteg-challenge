CREATE TABLE "colors" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "colors_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(50) NOT NULL,
	"hex" varchar(7) NOT NULL,
	CONSTRAINT "colors_name_unique" UNIQUE("name")
);
