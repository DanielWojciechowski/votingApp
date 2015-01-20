package com.github.danielwojciechowski.hotelApp.dataAccess.pojo;

import lombok.Data;
import org.springframework.data.rest.core.annotation.RestResource;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

/**
 * Created by Daniel on 2014-12-06.
 */
@Entity
@Data
public class RoomsInReservation {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    private boolean bed = false;

    @RestResource(exported = false)
    @ManyToOne(cascade=CascadeType.ALL, fetch=FetchType.EAGER)
    @JoinColumn(name="reservationId")
    private Reservation reservation;

    @ManyToOne(cascade={CascadeType.PERSIST, CascadeType.MERGE}, fetch=FetchType.LAZY)
    @JoinColumn(name="roomId")
    private Room room;


}
