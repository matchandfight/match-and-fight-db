/**
 * Sistema Elo adaptado para deportes de contacto
 * Basado en la fórmula estándar con ajustes personalizados
 */

interface EloResult {
  newRatingWinner: number;
  newRatingLoser: number;
  pointsChangeWinner: number;
  pointsChangeLoser: number;
}

/**
 * Calcula la expectativa de victoria
 * @param ratingA - Rating del peleador A
 * @param ratingB - Rating del peleador B
 * @returns Expectativa de victoria (0 a 1)
 */
export const calculateExpectation = (ratingA: number, ratingB: number): number => {
  return 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
};

/**
 * Calcula el nuevo rating Elo después de un combate
 * @param winnerRating - Rating actual del ganador
 * @param loserRating - Rating actual del perdedor
 * @param kFactor - Factor K (por defecto 32)
 * @param isKO - Si fue victoria por KO (bonus)
 * @returns Objeto con los nuevos ratings y cambios
 */
export const calculateEloChange = (
  winnerRating: number,
  loserRating: number,
  kFactor: number = 32,
  isKO: boolean = false
): EloResult => {
  // Calcular expectativas
  const expectedWinner = calculateExpectation(winnerRating, loserRating);
  const expectedLoser = calculateExpectation(loserRating, winnerRating);

  // Calcular cambios
  let pointsWinner = kFactor * (1 - expectedWinner);
  let pointsLoser = kFactor * (0 - expectedLoser);

  // Bonus por KO (10% más de puntos)
  if (isKO) {
    pointsWinner *= 1.1;
    pointsLoser *= 1.1;
  }

  // Redondear a 2 decimales
  pointsWinner = Math.round(pointsWinner * 100) / 100;
  pointsLoser = Math.round(pointsLoser * 100) / 100;

  return {
    newRatingWinner: Math.round((winnerRating + pointsWinner) * 100) / 100,
    newRatingLoser: Math.round((loserRating + pointsLoser) * 100) / 100,
    pointsChangeWinner: pointsWinner,
    pointsChangeLoser: pointsLoser,
  };
};

/**
 * Calcula la penalización por inactividad
 * @param currentRating - Rating actual
 * @param daysInactive - Días sin pelear
 * @param penaltyDays - Días antes de empezar penalización (por defecto 90)
 * @param penaltyPoints - Puntos a restar por periodo (por defecto 10)
 * @returns Nuevo rating con penalización aplicada
 */
export const applyInactivityPenalty = (
  currentRating: number,
  daysInactive: number,
  penaltyDays: number = 90,
  penaltyPoints: number = 10
): number => {
  if (daysInactive <= penaltyDays) {
    return currentRating;
  }

  // Calcular periodos de inactividad
  const periodsInactive = Math.floor((daysInactive - penaltyDays) / 30);
  const totalPenalty = periodsInactive * penaltyPoints;

  // No bajar de 800 puntos mínimo
  const newRating = Math.max(800, currentRating - totalPenalty);

  return Math.round(newRating * 100) / 100;
};

/**
 * Obtiene el factor K dinámico basado en experiencia
 * @param combatesTotal - Número total de combates
 * @returns Factor K apropiado
 */
export const getDynamicKFactor = (combatesTotal: number): number => {
  if (combatesTotal < 5) return 40; // Nuevos peleadores
  if (combatesTotal < 15) return 32; // Experiencia media
  return 24; // Peleadores experimentados
};

/**
 * Explica en palabras simples el cambio de puntos
 * @param winnerRating - Rating del ganador
 * @param loserRating - Rating del perdedor
 * @param pointsChange - Cambio de puntos
 * @returns Explicación en texto
 */
export const explainEloChange = (
  winnerRating: number,
  loserRating: number,
  pointsChange: number
): string => {
  const difference = Math.abs(winnerRating - loserRating);

  if (winnerRating > loserRating) {
    return `Como favorito (${Math.round(difference)} puntos de ventaja), ganaste ${Math.round(
      pointsChange
    )} puntos. Victoria esperada.`;
  } else {
    return `Como underdog (${Math.round(difference)} puntos en desventaja), ganaste ${Math.round(
      pointsChange
    )} puntos. ¡Gran victoria!`;
  }
};









