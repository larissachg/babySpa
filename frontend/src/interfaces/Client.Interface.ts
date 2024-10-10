export interface ClientInterface {
  IdCliente: number;
  NombreBebe: string;
  FechaNac: null;
  SemanaNac: null;
  Parto: null;
  PesoNac: null;
  PesoActual: null;
  Genero: null;
  NombreMama: null;
  EdadMama: null;
  NombrePapa: null;
  EdadPapa: null;
  Celular: null;
  CodigoPais: null;
  Email: null;
  AutorizacionRrss: null;
  UsuarioRrss: null;
  ConocimientoBabySpa: null;
  DatosMedicos: DatosMedicosInterface;
  DatosPrimeraEvaluciacion: null;
}

export interface DatosMedicosInterface {
  IdCliente: number;
  DificultadNacer: string;
  EstimulacionPrevia: null;
  CentroEstimulacionPrevia: null;
  DiagnosticoAlteracion: null;
  EnfermedadDiagnosticada: null;
  MedicamentoReciente: null;
}
