package oslomet.oblig_data1700;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;


@Repository
public class BillettRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    class BillettRowMapper implements RowMapper < Billett > {
        @Override
        public Billett mapRow(ResultSet rs, int rowNum) throws SQLException {
            Billett billett = new Billett();
            billett.setId(rs.getInt("id"));
            billett.setFilm(rs.getString("film"));
            billett.setAntall(rs.getInt("antall"));
            billett.setFornavn(rs.getString("fornavn"));
            billett.setEtternavn(rs.getString("etternavn"));
            billett.setTelefonnr(rs.getInt("telefonnr"));
            billett.setEpost(rs.getString("epost"));
            return billett;
        }
    }

    public Billett findById(int id) {
        return jdbcTemplate.queryForObject("select * from billett where id=?", new BillettRowMapper(), id);
    }

    public List<Billett> findAll() {
        return jdbcTemplate.query("select * from billett", new BillettRowMapper());
    }

    public int insertBillett(Billett billett) {
        String sql = "insert into billett (film, antall, fornavn, etternavn, telefonnr, epost) values (?, ?, ?, ?, ?, ?)";
        return jdbcTemplate.update(sql, billett.getFilm(), billett.getAntall(), billett.getFornavn(), billett.getEtternavn(), billett.getTelefonnr(), billett.getEpost());
    }

    public int slettBillett(Integer id){
        String sql = "delete from billett where id = ?";
        return jdbcTemplate.update(sql, new Object[] {id} );

    }
}
