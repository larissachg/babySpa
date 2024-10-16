export interface ClientInterface {
  IdCliente?: number;
  NombreBebe: string;
  FechaNac: Date;
  SemanaNac: number;
  Parto: 'Natural' | 'Cesarea';
  PesoNac: number;
  PesoActual: number;
  Genero: 'Femenino' | 'Masculino';
  NombreMama: string;
  EdadMama: number;
  NombrePapa: string;
  EdadPapa: number;
  Celular: number;
  CodigoPais: number;
  Email: string;
  AutorizacionRrss: boolean;
  UsuarioRrss: string;
  ConocimientoBabySpa: string;
  DatosMedicos: DatosMedicosInterface;
  DatosPrimeraEvaluciacion: DatosPrimeraEvaluciacionInterface;
}

export interface DatosMedicosInterface {
  IdCliente?: number;
  DificultadNacer: string;
  EstimulacionPrevia: string;
  CentroEstimulacionPrevia: string;
  DiagnosticoAlteracion: string;
  EnfermedadDiagnosticada: string;
  MedicamentoReciente: string;
}

export interface DatosPrimeraEvaluciacionInterface {
  IdCliente?: number;
  Visual?: 'Sigue' | 'NoSigue';
  ContactoVisual?: 'Si' | 'No';
  Auditivo?: 'Sigue' | 'NoSigue';
  Musculatura?: 'Bajo' | 'Normal' | 'Tension';
  ControlCervical?: 'Si' | 'No';
  CabezaAlzada?: 'Si' | 'No';
  Sentado?: 'Si' | 'No';
  Gateo?: 'Si' | 'No';
  Caminar?: 'Si' | 'No';
  EstadoAnimo?: 'Tranquilo' | 'Irritable';
}