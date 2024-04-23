package oslomet.oblig_data1700;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@AllArgsConstructor
@Data
public class Billett {
    private String film;
    private Integer antall;
    private String fornavn;
    private String etternavn;
    private Integer telefonnr;
    private String epost;
    private Integer id;


    public Billett(String film, Integer antall, String fornavn, String etternavn, Integer telefonnr, String epost) {
        this.film = film;
        this.antall = antall;
        this.fornavn = fornavn;
        this.etternavn = etternavn;
        this.telefonnr = telefonnr;
        this.epost = epost;
    }

    @Override
    public String toString() {
        return "Billett{" +
                "Film=" + film + '\'' +
                "Antall=" + antall + '\'' +
                ", Fornavn='" + fornavn + '\'' +
                ", Etternavn='" + etternavn + '\'' +
                ", Telefonnummer='" + telefonnr + '\'' +
                ", Epost='" + epost + '\'' +
                '}';

    }
}
