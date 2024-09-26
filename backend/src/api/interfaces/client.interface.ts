import {
  DatosCliente_Genero,
  DatosCliente_Parto,
  DatosPrimerEvaluciacion_Auditivo,
  DatosPrimerEvaluciacion_CabezaAlzada,
  DatosPrimerEvaluciacion_Caminar,
  DatosPrimerEvaluciacion_ContactoVisual,
  DatosPrimerEvaluciacion_ControlCervical,
  DatosPrimerEvaluciacion_EstadoAnimo,
  DatosPrimerEvaluciacion_Gateo,
  DatosPrimerEvaluciacion_Musculatura,
  DatosPrimerEvaluciacion_Sentado,
  DatosPrimerEvaluciacion_Visual,
} from "@prisma/client";

export interface ClientDataInterface {
  NombreBebe?: string;
  FechaNac?: Date;
  SemanaNac?: number;
  Parto?: DatosCliente_Parto;
  PesoNac?: number;
  PesoActual?: number;
  Genero?: DatosCliente_Genero;
  NombreMama?: string;
  EdadMama?: number;
  NombrePapa?: string;
  EdadPapa?: number;
  Celular?: string;
  CodigoPais?: string;
  Email?: string;
  AutorizacionRrss?: boolean;
  UsuarioRrss?: string;
  ConocimientoBabySpa?: string;
}

export interface ClientMedicDataInterface {
  IdCliente: number;
  DificultadNacer?: string;
  EstimulacionPrevia?: string;
  CentroEstimulacionPrevia?: string;
  DiagnosticoAlteracion?: string;
  EnfermedadDiagnosticada?: string;
  MedicamentoReciente?: string;
}

export interface ClientInterface {
  datosCliente: ClientDataInterface;
  datosMedicos: ClientMedicDataInterface;
}

export interface FirstEvaluationInterface {
  IdCliente?: number;
  Visual?: DatosPrimerEvaluciacion_Visual;
  ContactoVisual?: DatosPrimerEvaluciacion_ContactoVisual;
  Auditivo?: DatosPrimerEvaluciacion_Auditivo;
  Musculatura?: DatosPrimerEvaluciacion_Musculatura;
  ControlCervical?: DatosPrimerEvaluciacion_ControlCervical;
  CabezaAlzada?: DatosPrimerEvaluciacion_CabezaAlzada;
  Sentado?: DatosPrimerEvaluciacion_Sentado;
  Gateo?: DatosPrimerEvaluciacion_Gateo;
  Caminar?: DatosPrimerEvaluciacion_Caminar;
  EstadoAnimo?: DatosPrimerEvaluciacion_EstadoAnimo;
}
