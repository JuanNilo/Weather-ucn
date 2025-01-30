/*
  Warnings:

  - A unique constraint covering the columns `[fecha,hora]` on the table `DatosMeteorologicos` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "DatosMeteorologicos_fecha_hora_key" ON "DatosMeteorologicos"("fecha", "hora");
