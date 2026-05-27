CREATE TABLE "clients" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "clients_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"cpf" varchar(11) NOT NULL,
	"email" varchar(255) NOT NULL,
	"favorite_color_id" integer NOT NULL,
	"observations" varchar(1000),
	CONSTRAINT "clients_cpf_unique" UNIQUE("cpf"),
	CONSTRAINT "clients_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "clients" ADD CONSTRAINT "clients_favorite_color_id_colors_id_fk" FOREIGN KEY ("favorite_color_id") REFERENCES "public"."colors"("id") ON DELETE no action ON UPDATE no action;