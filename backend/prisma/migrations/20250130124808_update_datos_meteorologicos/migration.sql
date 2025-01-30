-- CreateTable
CREATE TABLE "DatosMeteorologicos" (
    "id" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hora" TEXT NOT NULL,
    "temperatura" DOUBLE PRECISION NOT NULL,
    "velocidadViento" DOUBLE PRECISION NOT NULL,
    "humedad" DOUBLE PRECISION NOT NULL,
    "radiacionUV" DOUBLE PRECISION NOT NULL,
    "presionAtmosferica" DOUBLE PRECISION NOT NULL,
    "salinidad" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "DatosMeteorologicos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DatosMeteorologicos_fecha_idx" ON "DatosMeteorologicos"("fecha");
