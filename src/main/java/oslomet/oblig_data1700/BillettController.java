package oslomet.oblig_data1700;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class BillettController {

    @Autowired
    BillettRepository billettRepository;

    @GetMapping("/getBillettFraDB")
    public Billett getBillettFraDB(@RequestParam Integer id) {
        return billettRepository.findById(id);
    }

    @GetMapping("/insertBillett")
    public void insertBillett() {billettRepository.insertBillett(new Billett("Biler", 2, "Per", "Ha", 91919191, "e@a.no"));}

    @GetMapping("/getBillett")
    public List<Billett> getBillett() {
        return billettRepository.findAll();
    }

    @DeleteMapping("/slettBillett")
    public String deleteBillett(@RequestParam Integer id) {
        billettRepository.slettBillett(id);
        return "deleted";
    }

    @PostMapping("/insertBillettTilDB")
    public void insertBillettTilDB(Billett billett) {
        billettRepository.insertBillett(billett);
    }


}